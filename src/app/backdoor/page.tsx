import { firebaseConfig } from '@/services/firebase';

export default function Backdoor() {
    return <pre>{JSON.stringify(firebaseConfig, null, 4)}</pre>;
}
