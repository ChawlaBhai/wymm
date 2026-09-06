import re

with open('frontend/src/lib/biodataService.ts', 'r') as f:
    content = f.read()

# Add getMyBiodatas function
get_my_biodatas = """
export async function getMyBiodatas(): Promise<{ id: string; biodata: BiodataRecord; is_paid: boolean; created_at: string }[]> {
  const { data: { user } } = await supabase.auth.getUser()
  let query = supabase.from('biodatas').select('id, biodata, is_paid, _createdAt').order('_createdAt', { ascending: false })
  
  if (user) {
    query = query.eq('_createdBy', user.id)
  } else {
    const sessionToken = localStorage.getItem('wymm-session-token')
    if (!sessionToken) return []
    query = query.eq('_sessionToken', sessionToken)
  }
  
  const { data, error } = await query
  if (error) return []
  return (data as any[]).map(r => ({ ...r, created_at: r._createdAt }))
}
"""
content += get_my_biodatas

# Update saveBiodata to check limits
save_biodata_new = """export async function saveBiodata(biodata: BiodataRecord): Promise<string> {
  const myBiodatas = await getMyBiodatas()
  const unpaidCount = myBiodatas.filter(b => !b.is_paid).length
  if (unpaidCount >= 5) {
    throw new Error('You have reached the limit of 5 free drafts. Please upgrade a profile to create more.')
  }

  const { data: { user } } = await supabase.auth.getUser()
  const firstName = biodata.basicInfo.fullName.split(' ')[0] ?? 'user'
  const lastName = biodata.basicInfo.fullName.split(' ').slice(1).join('-') || 'biodata'
  const slug = `${firstName}-${lastName}-${nanoid(5)}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
  
  const row = buildRow(biodata, slug, user?.id, user?.email ?? undefined)
  const { error } = await supabase.from('biodatas').insert(row)
  if (error) throw error
  return slug
}
"""

content = re.sub(
    r"export async function saveBiodata.*?return slug\n}",
    save_biodata_new,
    content,
    flags=re.DOTALL
)

# Update getBiodata to return is_paid flag
get_biodata_new = """export async function getBiodata(slug: string): Promise<BiodataRecord | null> {
  const { data, error } = await supabase.from('biodatas').select('biodata, is_paid').eq('id', slug).single()
  if (error || !data) return null
  const b = data.biodata as BiodataRecord
  b.isPaid = data.is_paid
  return b
}"""

content = re.sub(
    r"export async function getBiodata.*?return data\.biodata as BiodataRecord\n}",
    get_biodata_new,
    content,
    flags=re.DOTALL
)

with open('frontend/src/lib/biodataService.ts', 'w') as f:
    f.write(content)
