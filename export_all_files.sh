#!/bin/bash

# Create a comprehensive code export
echo "# Global Ideas Board - Complete Code Export" > COMPLETE_CODE_EXPORT.md
echo "" >> COMPLETE_CODE_EXPORT.md
echo "This contains all the code files for your Global Ideas Board application." >> COMPLETE_CODE_EXPORT.md
echo "" >> COMPLETE_CODE_EXPORT.md

# Add each file with proper formatting
add_file() {
    local file_path="$1"
    local display_name="$2"
    
    if [ -f "$file_path" ]; then
        echo "## $display_name" >> COMPLETE_CODE_EXPORT.md
        echo "\`\`\`$(basename "$file_path" | sed 's/.*\.//')" >> COMPLETE_CODE_EXPORT.md
        cat "$file_path" >> COMPLETE_CODE_EXPORT.md
        echo "" >> COMPLETE_CODE_EXPORT.md
        echo "\`\`\`" >> COMPLETE_CODE_EXPORT.md
        echo "" >> COMPLETE_CODE_EXPORT.md
    fi
}

# Root files
add_file "package.json" "package.json"
add_file "tsconfig.json" "tsconfig.json" 
add_file "vite.config.ts" "vite.config.ts"
add_file "tailwind.config.ts" "tailwind.config.ts"
add_file "postcss.config.js" "postcss.config.js"
add_file "components.json" "components.json"
add_file "drizzle.config.ts" "drizzle.config.ts"

# Server files
add_file "server/index.ts" "server/index.ts"
add_file "server/routes.ts" "server/routes.ts"
add_file "server/storage.ts" "server/storage.ts"
add_file "server/db.ts" "server/db.ts"
add_file "server/vite.ts" "server/vite.ts"

# Shared files
add_file "shared/schema.ts" "shared/schema.ts"

# Client files
add_file "client/index.html" "client/index.html"
add_file "client/src/main.tsx" "client/src/main.tsx"
add_file "client/src/App.tsx" "client/src/App.tsx"
add_file "client/src/index.css" "client/src/index.css"

# Pages
add_file "client/src/pages/home.tsx" "client/src/pages/home.tsx"
add_file "client/src/pages/not-found.tsx" "client/src/pages/not-found.tsx"

# Hooks
add_file "client/src/hooks/use-mobile.tsx" "client/src/hooks/use-mobile.tsx"
add_file "client/src/hooks/use-toast.ts" "client/src/hooks/use-toast.ts"
add_file "client/src/hooks/use-websocket.tsx" "client/src/hooks/use-websocket.tsx"

# Lib
add_file "client/src/lib/utils.ts" "client/src/lib/utils.ts"
add_file "client/src/lib/queryClient.ts" "client/src/lib/queryClient.ts"
add_file "client/src/lib/sdg-config.ts" "client/src/lib/sdg-config.ts"

echo "Export complete! Check COMPLETE_CODE_EXPORT.md"
