import { Redirect } from 'expo-router';

/** Root index redirects to Social tab (the active module) */
export default function Index() {
  return <Redirect href="/(tabs)/social" />;
}
