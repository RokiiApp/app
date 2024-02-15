import { memo } from 'react';
import { useRokiStore } from '@/state/rokiStore';
import { useRunPlugins } from '@/main/hooks/useRunPlugins';

import { ResultsList } from '../components/ResultsList';

const Home = ({ input }: { input: string }) => {
    useRunPlugins(input);

    const results = useRokiStore((s) => s.results);

    return <ResultsList items={results} />;
};

const memoizedHome = memo(Home);

export { memoizedHome as Home }
