# Qwen Chat Interface

An elegant and powerful chat interface for Qwen2.5-VL-7B-Instruct model, built with Next.js 14 and TypeScript.

![Qwen Chat Interface](public/logo.png)

## Features

- 🎨 Modern, clean UI with animations and transitions
- 💬 Real-time chat interface
- 🖼️ Image generation and processing
- 🔍 Web search capabilities
- 📝 Code generation and syntax highlighting
- 🎥 Video generation support
- 📊 Artifact handling
- 🌓 Light/Dark mode support
- 📱 Fully responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Validation**: Zod
- **Backend Integration**: REST API with Qwen2.5-VL-7B-Instruct

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/qwen-chat.git
cd qwen-chat
```

2. Install dependencies:
```bash
npm install
```

3. Add environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
qwen-chat/
├── app/                  # Next.js app router directory
├── components/          # React components
│   ├── ChatInterface.tsx
│   ├── ConnectionStatus.tsx
│   ├── MessageList.tsx
│   └── ChatActions.tsx
├── lib/                # Utility functions and services
│   ├── qwen-service.ts
│   ├── types.ts
│   └── utils.ts
├── hooks/             # Custom React hooks
│   └── use-chat.ts
├── public/            # Static files
│   └── logo.png
└── styles/           # Global styles
    └── globals.css
```

## Features in Detail

### Chat Interface
- Real-time messaging
- Message history
- Typing indicators
- File uploads
- Copy message content
- Timestamp display

### AI Capabilities
- Text generation
- Image generation
- Code generation
- Web search
- Video generation
- Plan creation
- News aggregation

### UI/UX
- Smooth animations
- Loading states
- Error handling
- Responsive design
- Accessibility features
- Keyboard shortcuts

## API Integration

The interface connects to the Qwen2.5-VL-7B-Instruct model via RESTful API endpoints:

- `/api/chat`: Main chat endpoint
- `/api/upload`: File upload endpoint
- `/api/generate`: Image generation endpoint

## Configuration

The project can be configured through environment variables and the `next.config.js` file.

### Environment Variables

- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `NEXT_PUBLIC_MAX_UPLOAD_SIZE`: Maximum file upload size
- `NEXT_PUBLIC_SUPPORTED_FILES`: Supported file types

### Next.js Configuration

See `next.config.js` for:
- Image optimization settings
- API routes
- Webpack configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Qwen Team for the amazing model
- Next.js team for the fantastic framework
- All contributors and users of this project

## Support

For support, please open an issue in the GitHub repository or contact us at [your-email].

## Security

Please report any security vulnerabilities to [security-email].

---

Made with ❤️ by [Your Name/Team]