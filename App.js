import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import StackNavigator from './navigations/StackNavigator';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const queryClient = new QueryClient();

const theme = {
	...DefaultTheme,
	dark: false,
	colors: {
		...DefaultTheme.colors,
		priamry: '#E84545',
		accent: '#E84545',
		background: '#FFFFFF',
		text: '#000000',
		surface: '#FFFFFF',
		onSurface: '#FFFFFF',
		backdrop: '#FFFFFF',
		notification: '#FFFFFF',
	}
}

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<PaperProvider theme={theme}>
				<StackNavigator />
				<StatusBar style='auto' />
			</PaperProvider>
		</QueryClientProvider>
	);
}