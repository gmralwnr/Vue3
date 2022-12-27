import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			dts: true,
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		proxy: {
			'/system': {
				//sysytem url 변경 proxy 는 앞에 url을 변경해주는 역할을 해줌
				//target: 'http://172.23.102.245:8110/',
				target: 'http://192.168.0.166:8110/',
				//109 /166
				//target: 'http://192.168.0.192:8000/',
				changeOrigin: true,
			},
		},
	},
});
