// import Sqids from 'sqids'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
     const sqids = new Sqids({
        minLength: 5
    })

    const encoded = sqids.encode([Math.round(Math.random() * 10)])

    const client = await serverSupabaseClient(event)
    const { data, error } = await client.from
        .from('Calendar')
        .upsert({ public_id: encoded })
        .select()
})
