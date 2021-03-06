import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const config = dotenv.parse(fs.readFileSync(`.env${process.env.NODE_ENV == null ? '' : '.' + process.env.NODE_ENV}`));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(3000),
      API_AUTH_ENABLED: Joi.boolean().required(),
      DB_TYPE: Joi.string().default('mongodb'),
      DB_HOST: Joi.string().default('localhost'),
      DB_PORT: Joi.number().default(27017),
      DB_NAME: Joi.string().default('nest'),
      DB_USER: Joi.string().default('root'),
      DB_PWD: Joi.string().default('root'),
      DB_LOG: Joi.string().default(false),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get isApiAuthEnabled(): boolean {
    return Boolean(this.envConfig.API_AUTH_ENABLED);
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }

  get dbType(): any {
    return String(this.envConfig.DB_TYPE);
  }

  get dbHost(): string {
    return String(this.envConfig.DB_HOST);
  }

  get dbPort(): number {
    return Number(this.envConfig.DB_PORT);
  }

  get dbName(): string {
    return String(this.envConfig.DB_NAME);
  }

  get dbUser(): string {
    return String(this.envConfig.DB_USER);
  }

  get dbPwd(): string {
    return String(this.envConfig.DB_PWD);
  }

  get dbLog(): boolean {
    return Boolean(this.envConfig.DB_LOG);
  }
}