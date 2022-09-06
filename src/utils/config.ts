// Helper utility to work with configurations
import dotenv from 'dotenv';

dotenv.config();

function getConfig(envKey: string): string {
  return <string>process.env[envKey];
}

export default {
  get: getConfig
};
