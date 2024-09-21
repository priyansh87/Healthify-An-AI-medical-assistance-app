import {neon} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'

import * as schema from './Schema.jsx'
 

const sql = neon(
    "postgresql://beat_cancer_owner:QPzeZ8rvCS1X@ep-tiny-boat-a5jymwu0.us-east-2.aws.neon.tech/beat_cancer?sslmode=require"
)

export const db = drizzle(sql , {schema})