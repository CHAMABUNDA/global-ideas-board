import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useWebSocket } from "@/hooks/use-websocket";
import { SDG_CONFIG } from "@/lib/sdg-config";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, DollarSign, Search, Share2, Edit, Trash2, Plus, Filter, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Idea {
  id: number;
  title: string;
  description: string;
  name: string;
  category: number;
  stage: number;
  imageData?: string | null;
  tags: string[];
  likes: number;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  ideaId: number;
  content: string;
  authorName: string;
  createdAt: string;
}

interface Stats {
  total: number;
  today: number;
  week: number;
  byCategory: Record<number, number>;
}

const STAGE_NAMES = ['Concept', 'Prototype', 'Pilot', 'Impact'];
const STAGE_COLORS = ['stage-concept', 'stage-prototype', 'stage-pilot', 'stage-impact'];
const STAGE_ICONS = ['💡', '⚙️', '🚀', '📈'];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [searchEngine, setSearchEngine] = useState("google");
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const [commenterName, setCommenterName] = useState("");
  const [activeUsers, setActiveUsers] = useState(42);
  
  // Form states
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    description: "",
    category: "",
    stage: "0",
    image: null as File | null
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const chartRef = useRef<HTMLCanvasElement>(null);

  // WebSocket connection
  const { isConnected, lastMessage } = useWebSocket('/ws');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Handle real-time updates
  useEffect(() => {
    if (lastMessage) {
      try {
        const message = JSON.parse(lastMessage);
        
        switch (message.type) {
          case 'idea_created':
          case 'idea_updated':
          case 'idea_liked':
          case 'comment_created':
            queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
            queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
            break;
          case 'idea_deleted':
          case 'comment_deleted':
            queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
            queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
            break;
          case 'stats_update':
            queryClient.setQueryData(['/api/stats'], message.data);
            break;
          case 'active_users':
            setActiveUsers(message.data.count);
            break;
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    }
  }, [lastMessage, queryClient]);

  // Fetch ideas
  const { data: ideas = [], isLoading: loadingIdeas } = useQuery<Idea[]>({
    queryKey: ['/api/ideas', { category: currentFilter, search: searchQuery, stage: stageFilter }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (currentFilter) params.append('category', currentFilter.toString());
      if (searchQuery) params.append('search', searchQuery);
      if (stageFilter && stageFilter !== "all") params.append('stage', stageFilter);
      
      return fetch(`/api/ideas?${params}`).then(res => res.json());
    }
  });

  // Fetch stats
  const { data: stats } = useQuery<Stats>({
    queryKey: ['/api/stats'],
  });

  // Create idea mutation
  const createIdeaMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        body: data,
      });
      if (!response.ok) throw new Error('Failed to create idea');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      toast({ title: "Success", description: "Idea submitted successfully!" });
      resetForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to submit idea", variant: "destructive" });
    },
  });

  // Update idea mutation
  const updateIdeaMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      const response = await fetch(`/api/ideas/${id}`, {
        method: 'PUT',
        body: data,
      });
      if (!response.ok) throw new Error('Failed to update idea');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
      toast({ title: "Success", description: "Idea updated successfully!" });
      setEditingIdea(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update idea", variant: "destructive" });
    },
  });

  // Delete idea mutation
  const deleteIdeaMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/ideas/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete idea');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      toast({ title: "Success", description: "Idea deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete idea", variant: "destructive" });
    },
  });

  // Like idea mutation
  const likeIdeaMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('POST', `/api/ideas/${id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
    },
  });

  // Create comment mutation
  const createCommentMutation = useMutation({
    mutationFn: async ({ ideaId, content, authorName }: { ideaId: number; content: string; authorName: string }) => {
      return apiRequest('POST', `/api/ideas/${ideaId}/comments`, { content, authorName });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
      setNewComment(prev => ({ ...prev, [variables.ideaId]: '' }));
      toast({ title: "Success", description: "Comment added successfully!" });
    },
  });

  // Delete comment mutation
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      return apiRequest('DELETE', `/api/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideas'] });
      toast({ title: "Success", description: "Comment deleted successfully!" });
    },
  });

  // Initialize chart
  useEffect(() => {
    if (stats && chartRef.current) {
      // Clear any existing chart
      const existingChart = (window as any).heatmapChart;
      if (existingChart) {
        existingChart.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // Import Chart.js dynamically
      import('chart.js/auto').then((Chart) => {
        const chartData = Array(17).fill(0);
        Object.entries(stats.byCategory).forEach(([category, count]) => {
          const index = parseInt(category) - 1;
          if (index >= 0 && index < 17) {
            chartData[index] = count;
          }
        });

        const chart = new Chart.default(ctx, {
          type: 'bar',
          data: {
            labels: SDG_CONFIG.names.slice(1),
            datasets: [{
              label: 'Number of Ideas',
              data: chartData,
              backgroundColor: [
                '#e11d48', '#dc2626', '#ea580c', '#d97706', '#ca8a04',
                '#65a30d', '#16a34a', '#059669', '#0d9488', '#0891b2',
                '#0284c7', '#2563eb', '#4f46e5', '#7c3aed', '#a21caf',
                '#be185d', '#e11d48'
              ],
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 1,
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  title: function(context) {
                    return `SDG ${context[0].dataIndex + 1}: ${context[0].label}`;
                  }
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  maxRotation: 45,
                  font: { size: 10 }
                }
              },
              y: {
                beginAtZero: true,
                ticks: { precision: 0 }
              }
            },
            onClick: (event, elements) => {
              if (elements.length > 0) {
                const sdgNumber = elements[0].index + 1;
                filterBySDG(sdgNumber);
              }
            }
          }
        });

        (window as any).heatmapChart = chart;
      });
    }
  }, [stats]);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
    
    toast({ title: "Theme Changed", description: `Switched to ${newDarkMode ? 'dark' : 'light'} mode` });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      name: "",
      description: "",
      category: "",
      stage: "0",
      image: null
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.name || !formData.description || !formData.category) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('stage', formData.stage);
    
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    createIdeaMutation.mutate(formDataToSend);
  };

  const handleEdit = (idea: Idea) => {
    setEditingIdea(idea);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIdea) return;

    const formDataToSend = new FormData();
    formDataToSend.append('title', editingIdea.title);
    formDataToSend.append('description', editingIdea.description);
    formDataToSend.append('category', editingIdea.category.toString());
    formDataToSend.append('stage', editingIdea.stage.toString());

    updateIdeaMutation.mutate({ id: editingIdea.id, data: formDataToSend });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      deleteIdeaMutation.mutate(id);
    }
  };

  const filterBySDG = (sdgNumber: number) => {
    if (currentFilter === sdgNumber) {
      setCurrentFilter(null);
    } else {
      setCurrentFilter(sdgNumber);
    }
  };

  const clearFilter = () => {
    setCurrentFilter(null);
    setSearchQuery("");
    setStageFilter("all");
  };

  const toggleComments = (ideaId: number) => {
    setShowComments(prev => ({
      ...prev,
      [ideaId]: !prev[ideaId]
    }));
  };

  const handleAddComment = (ideaId: number) => {
    const content = newComment[ideaId]?.trim();
    if (!content || !commenterName.trim()) {
      toast({ title: "Error", description: "Please enter your name and comment", variant: "destructive" });
      return;
    }

    createCommentMutation.mutate({
      ideaId,
      content,
      authorName: commenterName.trim()
    });
  };

  const searchOnline = (idea: Idea) => {
    const query = encodeURIComponent(`${idea.title} ${idea.description}`);
    let url = '';
    
    switch(searchEngine) {
      case 'google':
        url = `https://www.google.com/search?q=${query}`;
        break;
      case 'bing':
        url = `https://www.bing.com/search?q=${query}`;
        break;
      case 'duckduckgo':
        url = `https://duckduckgo.com/?q=${query}`;
        break;
    }
    
    window.open(url, '_blank');
  };

  const searchFunding = (idea: Idea) => {
    const query = encodeURIComponent(`${idea.title} funding grants`);
    let url = '';
    
    switch(searchEngine) {
      case 'google':
        url = `https://www.google.com/search?q=${query}`;
        break;
      case 'bing':
        url = `https://www.bing.com/search?q=${query}`;
        break;
      case 'duckduckgo':
        url = `https://duckduckgo.com/?q=${query}`;
        break;
    }
    
    window.open(url, '_blank');
  };

  const shareIdea = async (idea: Idea) => {
    if (navigator.share) {
      await navigator.share({
        title: idea.title,
        text: idea.description,
        url: window.location.href
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Success", description: "Link copied to clipboard!" });
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen">
      {/* Connection Status */}
      <div className={`connection-indicator ${isConnected ? 'connection-online' : 'connection-offline'}`}>
        <div className="pulse-dot"></div>
        <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-5 right-5 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="text-white border-white hover:bg-white hover:text-black"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </Button>
      </div>

      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-6xl font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Let's Chat Ideas – Global Board 🌍
          </h1>
          <p className="text-xl text-white mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Collaborate on sustainable solutions for the UN Sustainable Development Goals
          </p>
          <div className="flex justify-center items-center gap-4 mt-3">
            <Badge variant="secondary" className="bg-white text-black">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              {activeUsers} online
            </Badge>
            <Badge variant="secondary" className="bg-white text-black">
              💡 {stats?.total || 0} ideas shared
            </Badge>
          </div>
        </div>

        {/* Idea Submission Form */}
        <Card className="glass-card mb-4">
          <CardContent className="p-6">
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              💡 Submit Your Idea
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Idea Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter your idea title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your idea in detail..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>Minimum 10 characters</span>
                  <span>{formData.description.length}/1000</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">SDG Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select SDG Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {SDG_CONFIG.names.slice(1).map((name, index) => (
                        <SelectItem key={index + 1} value={(index + 1).toString()}>
                          SDG {index + 1} - {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stage">Development Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STAGE_NAMES.map((stage, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {STAGE_ICONS[index]} {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="image">Idea Image (Optional)</Label>
                <FileUpload
                  onFileChange={(file) => setFormData(prev => ({ ...prev, image: file }))}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={createIdeaMutation.isPending}
                >
                  {createIdeaMutation.isPending ? 'Submitting...' : '📤 Post Idea'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  ✖️ Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* SDG Carousel */}
        <Card className="glass-card mb-4">
          <CardContent className="p-6">
            <h5 className="text-lg font-semibold mb-3 flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filter by SDG Category
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {SDG_CONFIG.names.slice(1).map((name, index) => {
                const sdgNumber = index + 1;
                const isActive = currentFilter === sdgNumber;
                return (
                  <div
                    key={sdgNumber}
                    className={`relative cursor-pointer transition-all ${isActive ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => filterBySDG(sdgNumber)}
                  >
                    <img
                      src={SDG_CONFIG.icons[sdgNumber]}
                      alt={name}
                      className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <span className="text-white text-xs font-semibold text-center px-1">
                        SDG {sdgNumber}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-3">
              <Button variant="outline" size="sm" onClick={clearFilter}>
                <X className="mr-1 h-4 w-4" />
                Clear Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dashboard */}
        <Card className="glass-card mb-4">
          <CardContent className="p-6">
            <h5 className="text-lg font-semibold mb-3 flex items-center">
              📊 Ideas Distribution by SDG
            </h5>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <canvas ref={chartRef} style={{ maxHeight: '300px' }}></canvas>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                <Card className="bg-blue-500 text-white">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold">{stats?.total || 0}</div>
                    <div className="text-sm">Total Ideas</div>
                  </CardContent>
                </Card>
                <Card className="bg-green-500 text-white">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold">{stats?.today || 0}</div>
                    <div className="text-sm">Today</div>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-500 text-white">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold">{stats?.week || 0}</div>
                    <div className="text-sm">This Week</div>
                  </CardContent>
                </Card>
                <Card className="bg-orange-500 text-white">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold">{activeUsers}</div>
                    <div className="text-sm">Active Now</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="glass-card mb-4">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search">Search Ideas</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by title, description, or tags..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="sort">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="comments">Most Comments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="stage-filter">Filter by Stage</Label>
                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Stages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    {STAGE_NAMES.map((stage, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="search-engine">Search Engine</Label>
                <Select value={searchEngine} onValueChange={setSearchEngine}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="bing">Bing</SelectItem>
                    <SelectItem value="duckduckgo">DuckDuckGo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ideas List */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-lg font-semibold text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
              📝 Ideas ({ideas.length})
            </h5>
            <Badge variant="secondary" className="bg-white text-black">
              ⚡ Live Updates
            </Badge>
          </div>

          {loadingIdeas ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="glass-card">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-3"></div>
                      <div className="h-16 bg-muted rounded mb-3"></div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-muted rounded w-16"></div>
                        <div className="h-8 bg-muted rounded w-16"></div>
                        <div className="h-8 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : ideas.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">💡</div>
                <h5 className="text-xl mb-2">No ideas found</h5>
                <p className="text-muted-foreground">
                  Be the first to share an idea or adjust your filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="scrollable-list space-y-4">
              {ideas.map((idea) => (
                <Card key={idea.id} className="glass-card idea-card" style={{ borderLeftColor: `hsl(${(idea.category - 1) * 20}, 70%, 50%)` }}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <img
                          src={SDG_CONFIG.icons[idea.category]}
                          alt={`SDG ${idea.category}`}
                          className="w-10 h-10 rounded mr-3 object-cover"
                        />
                        <div>
                          <h6 className="font-semibold mb-1">{idea.title}</h6>
                          <small className="text-muted-foreground">
                            by {idea.name} • {formatTimeAgo(idea.createdAt)}
                          </small>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`progress-stage ${STAGE_COLORS[idea.stage]}`}>
                          {STAGE_ICONS[idea.stage]} {STAGE_NAMES[idea.stage]}
                        </Badge>
                        <div className="relative">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            ⋮
                          </Button>
                        </div>
                      </div>
                    </div>

                    <p className="mb-3">{idea.description}</p>

                    {idea.imageData && (
                      <img
                        src={idea.imageData}
                        alt="Idea"
                        className="w-full max-h-48 object-cover rounded-lg mb-3"
                      />
                    )}

                    {/* Progress visualization */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <small className="text-muted-foreground">Development Progress</small>
                        <small className="text-muted-foreground">{Math.round((idea.stage + 1) * 25)}%</small>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${(idea.stage + 1) * 25}%` }}
                        ></div>
                      </div>
                    </div>

                    {idea.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {idea.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => likeIdeaMutation.mutate(idea.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Heart className="mr-1 h-4 w-4" />
                          {idea.likes}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleComments(idea.id)}
                        >
                          <MessageCircle className="mr-1 h-4 w-4" />
                          {idea.comments.length}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => searchFunding(idea)}
                        >
                          <DollarSign className="mr-1 h-4 w-4" />
                          Funding
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => searchOnline(idea)}
                          title="Search online"
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => shareIdea(idea)}
                          title="Share idea"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(idea)}
                          title="Edit idea"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(idea.id)}
                          title="Delete idea"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Comments section */}
                    {showComments[idea.id] && (
                      <div className="mt-4 pt-4 border-t space-y-3">
                        {idea.comments.map((comment) => (
                          <div key={comment.id} className="flex items-start gap-2">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                              {comment.authorName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="bg-muted rounded-lg p-3">
                                <div className="font-semibold text-sm">{comment.authorName}</div>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                              <small className="text-muted-foreground ml-1">
                                {formatTimeAgo(comment.createdAt)}
                              </small>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteCommentMutation.mutate(comment.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="flex gap-2">
                          <Input
                            placeholder="Your name"
                            value={commenterName}
                            onChange={(e) => setCommenterName(e.target.value)}
                            className="w-32"
                          />
                          <Input
                            placeholder="Add a comment..."
                            value={newComment[idea.id] || ''}
                            onChange={(e) => setNewComment(prev => ({ ...prev, [idea.id]: e.target.value }))}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment(idea.id);
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(idea.id)}
                            disabled={createCommentMutation.isPending}
                          >
                            📤
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Edit Idea Modal */}
        <Dialog open={!!editingIdea} onOpenChange={() => setEditingIdea(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Idea</DialogTitle>
            </DialogHeader>
            {editingIdea && (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingIdea.title}
                    onChange={(e) => setEditingIdea(prev => prev ? { ...prev, title: e.target.value } : null)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    rows={4}
                    value={editingIdea.description}
                    onChange={(e) => setEditingIdea(prev => prev ? { ...prev, description: e.target.value } : null)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-category">SDG Category</Label>
                    <Select 
                      value={editingIdea.category.toString()} 
                      onValueChange={(value) => setEditingIdea(prev => prev ? { ...prev, category: parseInt(value) } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SDG_CONFIG.names.slice(1).map((name, index) => (
                          <SelectItem key={index + 1} value={(index + 1).toString()}>
                            SDG {index + 1} - {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-stage">Stage</Label>
                    <Select 
                      value={editingIdea.stage.toString()} 
                      onValueChange={(value) => setEditingIdea(prev => prev ? { ...prev, stage: parseInt(value) } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STAGE_NAMES.map((stage, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {STAGE_ICONS[index]} {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setEditingIdea(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updateIdeaMutation.isPending}>
                    {updateIdeaMutation.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
