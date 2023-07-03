import { Navigate } from "react-router-dom";
import { UserContext, useUser } from "../contexts/UserContext";
import { homeURL } from "../constants/urls";
import { LineWave } from "react-loader-spinner";

export function AdminRoute({ children }: any) {
  const { user, isLoadingUser } = useUser() as UserContext;

  if (isLoadingUser) {
    return (
    <div className="w-full flex justify-center">
        <LineWave
            height="250"
            width="250"
            color="#F77F00"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            visible={true}
            
        />
    </div>
    )
  }

  if (!isLoadingUser && !user || !isLoadingUser && (user.role !== "admin")) {
    return <Navigate to={homeURL} />;
  }

  return children;
}