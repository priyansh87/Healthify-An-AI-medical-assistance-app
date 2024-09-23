import {neon} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'

import * as schema from './Schema.jsx'
 

const sql = neon(
    "add you db url"
)

export const db = drizzle(sql , {schema})
