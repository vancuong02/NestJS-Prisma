import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'
import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsString, validateSync } from 'class-validator'

config({
    path: '.env',
})

if (!fs.existsSync(path.resolve('.env'))) {
    process.exit(1)
}

class ConfigSchema {
    @IsNotEmpty()
    @IsString()
    PORT: string

    @IsNotEmpty()
    @IsString()
    DATABASE_URL: string

    @IsNotEmpty()
    @IsString()
    ACCESS_TOKEN_SECRET: string

    @IsNotEmpty()
    @IsString()
    ACCESS_TOKEN_EXPIRES_IN: string

    @IsNotEmpty()
    @IsString()
    REFRESH_TOKEN_SECRET: string

    @IsNotEmpty()
    @IsString()
    REFRESH_TOKEN_EXPIRES_IN: string
}

const configServer = plainToInstance(ConfigSchema, process.env)
const e = validateSync(configServer)
if (e.length > 0) {
    console.log('Các giá trị trong file .env không hợp lệ')
    const errors = e.map((error) => {
        return {
            property: error.property,
            constraints: error.constraints,
            value: error.value,
        }
    })
    throw errors
}

const envConfig = configServer as ConfigSchema
export default envConfig
