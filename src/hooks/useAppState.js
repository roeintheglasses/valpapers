import {useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';

export default function useAppState(onChange) {
  useEffect(() => {
    AppState.addEventListener('change', onChange);
    return () => {
      AppState.removeEventListener('change', onChange);
    };
  }, [onChange]);
}
