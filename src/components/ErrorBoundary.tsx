import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 text-center">
          <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl border border-red-500/20 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Waduh, ada masalah!</h2>
            <p className="text-slate-400 mb-6">
              Terjadi kesalahan pada aplikasi. Coba muat ulang halaman atau hubungi admin.
            </p>
            <div className="bg-red-500/10 p-4 rounded-lg text-red-400 text-xs font-mono text-left overflow-auto max-h-40 mb-6">
              {error?.message}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}
