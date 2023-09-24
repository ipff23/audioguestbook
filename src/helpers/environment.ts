import { execSync } from 'child_process';
import packageJson from '../../package.json';

const VERCEL_GIT_COMMIT_SHA = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;

export const getCommitHash = () => {
    if (VERCEL_GIT_COMMIT_SHA !== undefined) {
        return VERCEL_GIT_COMMIT_SHA;
    }

    const localCommitHash = execSync('git rev-parse HEAD').toString().trim();
    return localCommitHash;
};

export const getEnvironmentInfo = (): {
    semver: string;
    commit: string;
    'commit-short': string;
} => {
    const commitHash = getCommitHash();
    return {
        semver: packageJson.version,
        commit: commitHash,
        'commit-short': commitHash.substring(0, 7),
    };
};
