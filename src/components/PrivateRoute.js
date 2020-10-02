import React, { useState, useEffect } from "react";
import { permissionGranted as checkPermissions } from "../services/authenticationService";

const PrivateRoute = ({
  component: Component,
  permissionComponent: PermissionComponent,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermission] = useState(false);

  useEffect(() => {
    init();
  });

  const init = async () => {
    if (await checkPermissions()) {
      setPermission(true);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <div id="spinner-1" />
      ) : permissionGranted ? (
        <Component />
      ) : (
        <PermissionComponent />
      )}
    </div>
  );
};

export default PrivateRoute;
