import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { PublicLayout } from '../layouts/PublicLayout';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AdminRoute } from '../components/auth/AdminRoute';

// Public pages
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

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import AdminLogin from '../pages/admin/AdminLogin';

// User Dashboard pages
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
import UserSettings from '../pages/user/Settings';

// Admin Dashboard pages
import AdminDashboard from '../pages/admin/Dashboard';
import ConferenceList from '../pages/admin/conferences/ConferenceList';
import CreateConference from '../pages/admin/conferences/CreateConference';
import EditConference from '../pages/admin/conferences/EditConference';
import SpeakerList from '../pages/admin/speakers/SpeakerList';
import CreateSpeaker from '../pages/admin/speakers/CreateSpeaker';
import EditSpeaker from '../pages/admin/speakers/EditSpeaker';
import UserList from '../pages/admin/users/UserList';
import RegistrationList from '../pages/admin/registrations/RegistrationList';
import AbstractList from '../pages/admin/abstracts/AbstractList';
import AbstractReview from '../pages/admin/abstracts/AbstractReview';
import BlogManagement from '../pages/admin/blogs/BlogManagement';
import CreateBlog from '../pages/admin/blogs/CreateBlog';
import EditBlog from '../pages/admin/blogs/EditBlog';
import FaqManagement from '../pages/admin/faqs/FaqManagement';
import GalleryManagement from '../pages/admin/gallery/GalleryManagement';
import PaymentList from '../pages/admin/payments/PaymentList';
import Reports from '../pages/admin/reports/Reports';
import AdminSettings from '../pages/admin/settings/Settings';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
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

        {/* Authentication Routes */}
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.register} element={<Register />} />
        <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
        <Route path={ROUTES.resetPassword} element={<ResetPassword />} />
        <Route path={ROUTES.adminLogin} element={<AdminLogin />} />

        {/* User Dashboard Routes (Protected) */}
        <Route
          path={ROUTES.userDashboard}
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
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
          <Route path="settings" element={<UserSettings />} />
        </Route>

        {/* Admin Dashboard Routes (Protected by AdminRoute) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="conferences" element={<ConferenceList />} />
          <Route path="conferences/new" element={<CreateConference />} />
          <Route path="conferences/:id/edit" element={<EditConference />} />
          <Route path="speakers" element={<SpeakerList />} />
          <Route path="speakers/new" element={<CreateSpeaker />} />
          <Route path="speakers/:id/edit" element={<EditSpeaker />} />
          <Route path="users" element={<UserList />} />
          <Route path="registrations" element={<RegistrationList />} />
          <Route path="abstracts" element={<AbstractList />} />
          <Route path="abstracts/:id" element={<AbstractReview />} />
          <Route path="blogs" element={<BlogManagement />} />
          <Route path="blogs/new" element={<CreateBlog />} />
          <Route path="blogs/:id/edit" element={<EditBlog />} />
          <Route path="faqs" element={<FaqManagement />} />
          <Route path="gallery" element={<GalleryManagement />} />
          <Route path="payments" element={<PaymentList />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
