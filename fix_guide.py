import re
with open('frontend/src/pages/GuidePage.tsx', 'r') as f:
    content = f.read()

content = content.replace('className="prose dark:prose-invert prose-purple max-w-none"', 'className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed space-y-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:dark:text-white [&>h2]:mt-10 [&>p]:mb-4"')

with open('frontend/src/pages/GuidePage.tsx', 'w') as f:
    f.write(content)
