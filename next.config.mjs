/** @type {import('next').NextConfig} */
const nextConfig = {
  // A versão original ignorava erros de ESLint e TypeScript no build, o que
  // mascarava problemas reais. Agora o lint roda nos diretórios da aplicação e
  // o build não suprime mais erros de tipo.
  eslint: {
    dirs: ["app", "components", "lib", "hooks"],
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
