with open('frontend/src/lib/biodataService.ts', 'r') as f:
    content = f.read()

# Replace the two saveBiodatas with one saveBiodata and one saveBiodataWithSlug
correct_part = """export async function checkSlugAvailable(slug: string): Promise<boolean> {
  const { count } = await supabase.from('biodatas').select('id', { count: 'exact', head: true }).eq('id', slug)
  return count === null || count === 0
}

export async function saveBiodataWithSlug(biodata: BiodataRecord, slug: string, oldSlug?: string): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser()
  // If renaming (oldSlug differs), delete the old record first
  if (oldSlug && oldSlug !== slug) {
    await supabase.from('biodatas').delete().eq('id', oldSlug)
  }
  const { error } = await supabase.from('biodatas').upsert(buildRow(biodata, slug, user?.id, user?.email ?? undefined))
  if (error) throw error
  return slug
}"""

import re
content = re.sub(r"export async function checkSlugAvailable.*?return slug\n}", correct_part, content, flags=re.DOTALL)

with open('frontend/src/lib/biodataService.ts', 'w') as f:
    f.write(content)
