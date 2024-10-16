import { Routes } from '@angular/router';
import { webRoutes } from './core/constants/routes';
import { DetailsComponent } from './pages/homepage/components/opportunities/components/details/details.component';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: webRoutes.home,
        pathMatch: "full"
    },

    //Homepage
    {
        path: webRoutes.home,
        loadComponent: () =>
            import('./pages/homepage/homepage.component')
                .then(m => m.HomepageComponent),
        children: [

            //
            {
                path: "",
                loadComponent: () =>
                    import('./pages/homepage/components/home/home.component')
                        .then(m => m.HomeComponent),
            },
            // Opportunities
            {
                path: "opportunities",
                children: [
                    // Listing
                    {
                        path: "",
                        loadComponent: () =>
                            import('./pages/homepage/components/opportunities/opportunities.component')
                                .then(m => m.OpportunitiesComponent),
                    },
                    // Details
                    {
                        path: "details",
                        loadComponent: () =>
                            import('./pages/homepage/components/opportunities/components/details/details.component')
                                .then(m => DetailsComponent),
                    },
                ]
            },
        ]
    },

    //Profile
    {
        path: webRoutes.profile,
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./pages/profile/profile.component')
                .then(m => m.ProfileComponent),
        children: [
            // Dashboard
            {
                path: "",
                loadComponent: () =>
                    import('./pages/profile/components/dashboard/dashboard.component')
                        .then(m => m.DashboardComponent),
            },
            // Information
            {
                path: "information",
                loadComponent: () =>
                    import('./pages/profile/components/information/information.component')
                        .then(m => m.InformationComponent),
            },
            // Investement
            {
                path: "investement",
                loadComponent: () =>
                    import('./pages/profile/components/investment/investment.component')
                        .then(m => m.InvestmentComponent),
            },
            // Advisor
            {
                path: webRoutes.advisor,
                loadComponent: () =>
                    import('./pages/profile/components/advisor/advisor.component')
                        .then(m => m.AdvisorComponent),
            },
            // Watchlist
            {
                path: webRoutes.watchlist,
                loadComponent: () =>
                    import('./pages/profile/components/watch-list/watch-list.component')
                        .then(m => m.WatchListComponent),
            },
        ]
    },

    // Authetication
    {
        path: "auth",
        loadComponent: () =>
            import('./pages/auth/auth.component')
                .then(m => m.AuthComponent),
        canActivate: [NoAuthGuard],
        children: [
            {
                path: "", redirectTo: "login", pathMatch: "full"
            },
            // Login
            {
                path: webRoutes.login,
                loadComponent: () =>
                    import('./pages/auth/components/login/login.component')
                        .then(m => m.LoginComponent),
            },
            // Registration
            {
                path: webRoutes.signup,
                loadComponent: () =>
                    import('./pages/auth/components/signup/signup.component')
                        .then(m => m.SignupComponent),
            },
            // OTP
            {
                path: webRoutes.otp,
                loadComponent: () =>
                    import('./pages/auth/components/otp/otp.component')
                        .then(m => m.OtpComponent),
            },
            // Success
            {
                path: webRoutes.success,
                loadComponent: () =>
                    import('./pages/auth/components/success/success.component')
                        .then(m => m.SuccessComponent),
            },
            // Forget password
            {
                path: webRoutes.forgetPassword,
                loadComponent: () =>
                    import('./pages/auth/components/forget-password/forget-password.component')
                        .then(m => m.ForgetPasswordComponent),
            },
            // Change password
            {
                path: webRoutes.changePassword,
                loadComponent: () =>
                    import('./pages/auth/components/change-password/change-password.component')
                        .then(m => m.ChangePasswordComponent),
            },
            // Account type
            {
                path: webRoutes.accountType,
                loadComponent: () =>
                    import('./pages/auth/components/account-type/account-type.component')
                        .then(m => m.AccountTypeComponent),
            },

        ]
    },




    // Registration
    {
        path: webRoutes.registration,
        canActivate: [AuthGuard],
        children: [

            {
                path: "success",
                loadComponent: () =>
                    import('./pages/registration/components/success/success.component')
                        .then(m => m.SuccessComponent),
            },
            {
                path: ":type",
                loadComponent: () =>
                    import('./pages/registration/registration.component')
                        .then(m => m.RegistrationComponent),
            },
        ]
    },
];
