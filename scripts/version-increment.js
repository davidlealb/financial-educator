import { execSync } from 'child_process';

try {
    console.log('🚀 Incrementing app version...');
    // Increment version in package.json without creating a git tag
    execSync('npm version patch --no-git-tag-version', { stdio: 'inherit' });

    console.log('📦 Staging package files...');
    // Stage the updated files so they are included in the current commit
    execSync('git add package.json package-lock.json', { stdio: 'inherit' });

    console.log('✅ Version incremented and staged.');
} catch (error) {
    console.error('❌ Failed to increment version:', error.message);
    process.exit(1);
}
