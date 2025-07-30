import { ROUTE_PATH } from "@/routes/paths";
import React from "react";
import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
  redirect?: boolean;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("ErrorBoundary caught an error:", error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.redirect) {
        return <Navigate to={ROUTE_PATH.HOME} replace />;
      }
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
