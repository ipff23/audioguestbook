import { execSync } from 'child_process';
import packageJson from '../../package.json';

export const getCommitHash = () => {
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
