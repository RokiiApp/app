import { memo } from 'react';
import { useActionsStore } from '@/stores/actions';
import { useRunPlugins } from '@/main/hooks/useRunPlugins';

import { ResultsList } from '../components/ResultsList';

const Home = ({ input }: { input: string }) => {
    useRunPlugins(input);

    const results = useActionsStore((s) => s.actions);

    return <ResultsList items={results} />;
};

const memoizedHome = memo(Home);

export { memoizedHome as Home }
