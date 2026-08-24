import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { PublicLayout } from '../layouts/PublicLayout';
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Conferences from '../pages/public/Conferences';
import ConferenceDetails from '../pages/public/ConferenceDetails';
import Speakers from '../pages/public/Speakers';
import SpeakerDetails from '../pages/public/SpeakerDetails';
import Contact from '../pages/public/Contact';
import FAQ from '../pages/public/FAQ';
import Gallery from '../pages/public/Gallery';
import Blogs from '../pages/public/Blogs';
import BlogDetails from '../pages/public/BlogDetails';
import PrivacyPolicy from '../pages/public/PrivacyPolicy';
import TermsOfUse from '../pages/public/TermsOfUse';
import Sitemap from '../pages/public/Sitemap';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import AdminLogin from '../pages/admin/AdminLogin';
import UserDashboard from '../pages/user/Dashboard';
import Profile from '../pages/user/Profile';
import EditProfile from '../pages/user/EditProfile';
import MyConferences from '../pages/user/MyConferences';
import Registrations from '../pages/user/Registrations';
import RegistrationDetails from '../pages/user/RegistrationDetails';
import Abstracts from '../pages/user/Abstracts';
import SubmitAbstract from '../pages/user/SubmitAbstract';
import AbstractDetails from '../pages/user/AbstractDetails';
import Certificates from '../pages/user/Certificates';
import Notifications from '../pages/user/Notifications';
import Settings from '../pages/user/Settings';
import AdminDashboard from '../pages/admin/Dashboard';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AdminRoute } from '../components/auth/AdminRoute';
import { UserLayout } from '../layouts/UserLayout';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.about} element={<About />} />
          <Route path={ROUTES.conferences} element={<Conferences />} />
          <Route path={ROUTES.conferenceDetails} element={<ConferenceDetails />} />
          <Route path={ROUTES.speakers} element={<Speakers />} />
          <Route path={ROUTES.speakerDetails} element={<SpeakerDetails />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path={ROUTES.faq} element={<FAQ />} />
          <Route path={ROUTES.gallery} element={<Gallery />} />
          <Route path={ROUTES.blogs} element={<Blogs />} />
          <Route path={ROUTES.blogDetails} element={<BlogDetails />} />
          <Route path={ROUTES.privacyPolicy} element={<PrivacyPolicy />} />
          <Route path={ROUTES.terms} element={<TermsOfUse />} />
          <Route path={ROUTES.sitemap} element={<Sitemap />} />
        </Route>
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.register} element={<Register />} />
        <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
        <Route path={ROUTES.resetPassword} element={<ResetPassword />} />
        <Route path={ROUTES.adminLogin} element={<AdminLogin />} />
        <Route path={ROUTES.userDashboard} element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
          <Route index element={<UserDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="conferences" element={<MyConferences />} />
          <Route path="registrations" element={<Registrations />} />
          <Route path="registrations/:id" element={<RegistrationDetails />} />
          <Route path="abstracts" element={<Abstracts />} />
          <Route path="abstracts/new" element={<SubmitAbstract />} />
          <Route path="abstracts/:id" element={<AbstractDetails />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path={ROUTES.adminDashboard} element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
