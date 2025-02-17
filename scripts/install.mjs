import { execSync } from 'child_process';
import os from 'os';

if (os.platform() === 'win32') {
  execSync('npm install @remotion/compositor-win32-x64-msvc', { stdio: 'inherit' });
}
