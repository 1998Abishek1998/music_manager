import { Application, Router } from 'express';

// Function to log all routes
export const logRoutes = (app: Application) => {
  const printRoutes = (stack: any[], parentPath: string = '') => {
    stack.forEach((middleware: any) => {
      if (middleware.route) { // routes registered directly on the app
        console.log(`${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${parentPath}${middleware.route.path}`);
      } else if (middleware.name === 'router' && middleware.handle.stack) { // router middleware
        printRoutes(middleware.handle.stack, `${parentPath}${middleware.regexp}`);
      }
    });
  };

  const stack: any[] = app._router.stack;
  printRoutes(stack);
};
