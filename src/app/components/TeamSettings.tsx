import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, UserPlus, Mail, X, Upload, Info } from 'lucide-react';

interface TeamSettingsProps {
  onBack: () => void;
  darkMode?: boolean;
  selectedFarm?: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Manager' | 'Nutritionist' | 'Technician';
  avatarColor: string;
}

interface RolePermissions {
  submitSamples: boolean;
  viewResults: boolean;
  downloadReports: boolean;
  manageTeam: boolean;
  modifyTests: boolean;
  viewBilling: boolean;
}

export function TeamSettings({ onBack, darkMode, selectedFarm }: TeamSettingsProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<string>('Nutritionist');
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const organizationName = selectedFarm || 'Friendly Illinois Brothers';

  // Different organization members for each organization (based on movie characters)
  const getTeamMembersByOrg = (org: string): TeamMember[] => {
    switch (org) {
      case 'Friendly Illinois Brothers':
        return [
          {
            id: '1',
            name: 'Austin Russell',
            email: 'austin_russell@rockriverlab.com',
            role: 'Owner',
            avatarColor: 'bg-gray-700',
          },
          {
            id: '2',
            name: 'Katie Raver',
            email: 'k.raver@vaguebros.com',
            role: 'Manager',
            avatarColor: 'bg-gray-600',
          },
          {
            id: '3',
            name: 'Michelle Kolb',
            email: 'm.kolb@vaguebros.com',
            role: 'Nutritionist',
            avatarColor: 'bg-gray-500',
          },
          {
            id: '4',
            name: 'Deanna Braunschweig',
            email: 'd.braunschweig@vaguebros.com',
            role: 'Nutritionist',
            avatarColor: 'bg-gray-500',
          },
          {
            id: '5',
            name: 'Andy Schroeder',
            email: 'a.schroeder@vaguebros.com',
            role: 'Technician',
            avatarColor: 'bg-gray-600',
          },
        ];
      
      case 'Standard Dairy Consultants':
        return [
          {
            id: '1',
            name: 'Austin Russell',
            email: 'a.russell@standarddairy.com',
            role: 'Manager',
            avatarColor: 'bg-blue-700',
          },
          {
            id: '2',
            name: 'David Gilmour',
            email: 'd.gilmour@standarddairy.com',
            role: 'Manager',
            avatarColor: 'bg-green-600',
          },
          {
            id: '3',
            name: 'Nick Mason',
            email: 'n.mason@standarddairy.com',
            role: 'Nutritionist',
            avatarColor: 'bg-orange-500',
          },
          {
            id: '4',
            name: 'Richard Wright',
            email: 'r.wright@standarddairy.com',
            role: 'Technician',
            avatarColor: 'bg-red-600',
          },
        ];
      
      case 'Goeser\'s Grazers':
        return [
          {
            id: '1',
            name: 'Austin Russell',
            email: 'a.russell@howaryoofolks.com',
            role: 'Owner',
            avatarColor: 'bg-amber-700',
          },
          {
            id: '2',
            name: 'Keith Richards',
            email: 'k.richards@howaryoofolks.com',
            role: 'Manager',
            avatarColor: 'bg-slate-600',
          },
          {
            id: '3',
            name: 'Charlie Watts',
            email: 'c.watts@howaryoofolks.com',
            role: 'Nutritionist',
            avatarColor: 'bg-purple-500',
          },
          {
            id: '4',
            name: 'Ronnie Wood',
            email: 'r.wood@howaryoofolks.com',
            role: 'Nutritionist',
            avatarColor: 'bg-indigo-500',
          },
          {
            id: '5',
            name: 'Bill Wyman',
            email: 'b.wyman@howaryoofolks.com',
            role: 'Technician',
            avatarColor: 'bg-emerald-600',
          },
        ];
      
      case 'Scott Tindall':
        return [
          {
            id: '1',
            name: 'Austin Russell',
            email: 'austinrussell@csalabs.com',
            role: 'Manager',
            avatarColor: 'bg-green-700',
          },
        ];
      
      default:
        return [];
    }
  };

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(getTeamMembersByOrg(organizationName));

  // Update organization members when organization changes
  useEffect(() => {
    setTeamMembers(getTeamMembersByOrg(organizationName));
  }, [organizationName]);

  const rolePermissions: Record<string, RolePermissions> = {
    Owner: {
      submitSamples: true,
      viewResults: true,
      downloadReports: true,
      manageTeam: true,
      modifyTests: true,
      viewBilling: true,
    },
    Manager: {
      submitSamples: true,
      viewResults: true,
      downloadReports: true,
      manageTeam: true,
      modifyTests: true,
      viewBilling: true,
    },
    Nutritionist: {
      submitSamples: false,
      viewResults: true,
      downloadReports: true,
      manageTeam: false,
      modifyTests: false,
      viewBilling: false,
    },
    Technician: {
      submitSamples: true,
      viewResults: false,
      downloadReports: false,
      manageTeam: false,
      modifyTests: false,
      viewBilling: false,
    },
  };

  const permissionLabels = {
    submitSamples: 'Submit Samples',
    viewResults: 'View Results',
    downloadReports: 'Download Reports',
    manageTeam: 'Manage Team',
    modifyTests: 'Modify Tests',
    viewBilling: 'View Billing',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendInvite = () => {
    if (!inviteEmail.trim()) return;

    console.log('Sending invite:', { email: inviteEmail, role: inviteRole });

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole as TeamMember['role'],
      avatarColor: 'bg-gray-600',
    };

    setTeamMembers([...teamMembers, newMember]);
    setInviteEmail('');
    setInviteRole('Nutritionist');
    setShowInviteModal(false);
  };

  const bgColor = darkMode ? 'bg-[#181818]' : 'bg-stone-200';
  const cardBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const cardBorder = darkMode ? 'border border-[#2C2C2C]' : 'shadow-md';
  const headerBg = darkMode ? 'bg-[#252525]' : 'bg-white';
  const headerBorder = darkMode ? 'border-b border-[#2C2C2C]' : 'shadow-sm';
  const textPrimary = darkMode ? 'text-[#E0E0E0]' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-gray-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-gray-500';
  const hoverBg = darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-100';
  const hoverItemBg = darkMode ? 'hover:bg-[#2C2C2C]' : 'hover:bg-gray-50';
  const divideBorder = darkMode ? 'divide-[#2C2C2C]' : 'divide-gray-100';
  const borderColor = darkMode ? 'border-[#2C2C2C]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#1A1A1A]' : 'bg-white';
  const inputBorder = darkMode ? 'border-[#3C3C3C]' : 'border-gray-300';

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Header */}
      <header className={`${headerBg} ${headerBorder} sticky top-0 z-10`}>
        <div className="px-4 py-3">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 -ml-2 p-2 ${textSecondary} transition-colors ${hoverBg} rounded-lg`}
          >
            <ArrowLeft className="size-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-4xl mx-auto space-y-6">
        {/* Organization Header */}
        <div>
          <h1 className={`text-2xl font-semibold ${textPrimary} mb-1`}>
            {organizationName}
          </h1>
          <p className={`text-sm ${textSecondary}`}>
            Manage organization members, permissions, and organization settings
          </p>
        </div>

        {/* Organization Members Section */}
        <section className={`${cardBg} ${cardBorder} rounded-2xl overflow-hidden`}>
          <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
            <div>
              <h2 className={`text-lg font-semibold ${textPrimary}`}>Organization Members</h2>
              <p className={`text-sm ${textSecondary} mt-1`}>
                {teamMembers.length} {teamMembers.length === 1 ? 'member' : 'members'}
              </p>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className={`flex items-center gap-2 ${darkMode ? 'bg-[#2C2C2C] hover:bg-[#333333]' : 'bg-gray-800 hover:bg-gray-900'} text-white px-4 py-2 rounded-lg transition-colors`}
            >
              <UserPlus className="size-4" />
              <span className="font-medium text-sm">Invite User</span>
            </button>
          </div>

          {/* Group by Role */}
          {['Owner', 'Manager', 'Nutritionist', 'Technician'].map(role => {
            const membersInRole = teamMembers.filter(m => m.role === role);
            if (membersInRole.length === 0) return null;

            return (
              <div key={role}>
                <div className={`px-6 py-2 ${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} border-b ${borderColor}`}>
                  <h3 className={`text-xs font-semibold ${textTertiary} uppercase tracking-wider`}>
                    {role} {membersInRole.length > 1 && `(${membersInRole.length})`}
                  </h3>
                </div>
                <div className={`divide-y ${divideBorder}`}>
                  {membersInRole.map((member) => (
                    <div
                      key={member.id}
                      className={`px-6 py-4 ${hoverItemBg} transition-colors`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div
                          className={`${member.avatarColor} text-white rounded-full size-11 flex items-center justify-center font-semibold text-sm flex-shrink-0`}
                        >
                          {getInitials(member.name)}
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold ${textPrimary}`}>
                            {member.name}
                          </h3>
                          <p className={`text-sm ${textSecondary} truncate`}>
                            {member.email}
                          </p>
                        </div>

                        {/* Role Badge */}
                        <div className={`px-3 py-1 rounded-lg ${darkMode ? 'bg-[#2C2C2C]' : 'bg-gray-100'} ${textSecondary} text-sm font-medium`}>
                          {member.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Company Logo Section */}
        <section className={`${cardBg} ${cardBorder} rounded-2xl p-6`}>
          <h2 className={`text-lg font-semibold ${textPrimary} mb-1`}>Organization Logo</h2>
          <p className={`text-sm ${textSecondary} mb-4`}>
            Upload your company logo to personalize reports and documents
          </p>
          
          <div className="flex items-center gap-6">
            <div className={`${darkMode ? 'bg-[#1E1E1E] border border-[#3C3C3C]' : 'bg-gray-100 border-2 border-gray-200'} rounded-xl size-24 flex items-center justify-center overflow-hidden`}>
              {companyLogo ? (
                <img src={companyLogo} alt="Company Logo" className="w-full h-full object-contain" />
              ) : (
                <div className={`text-center ${textTertiary}`}>
                  <Upload className="size-8 mx-auto mb-1 opacity-40" />
                  <span className="text-xs">No logo</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`px-4 py-2 border ${inputBorder} ${textSecondary} rounded-lg ${hoverBg} transition-colors font-medium text-sm`}
              >
                {companyLogo ? 'Change Logo' : 'Upload Logo'}
              </button>
              <p className={`text-xs ${textTertiary} mt-2`}>
                Recommended: Square image, minimum 400x400px
              </p>
            </div>
          </div>
        </section>

        {/* Roles & Permissions Overview */}
        <section className={`${cardBg} ${cardBorder} rounded-2xl overflow-hidden`}>
          <div className={`px-6 py-4 border-b ${borderColor}`}>
            <h2 className={`text-lg font-semibold ${textPrimary} mb-1`}>Roles & Permissions</h2>
            <p className={`text-sm ${textSecondary}`}>
              Overview of what each role can do in the system
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} border-b ${borderColor}`}>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${textPrimary}`}>
                    Permission
                  </th>
                  <th className={`px-4 py-3 text-center text-sm font-semibold ${textPrimary}`}>
                    Owner
                  </th>
                  <th className={`px-4 py-3 text-center text-sm font-semibold ${textPrimary}`}>
                    Manager
                  </th>
                  <th className={`px-4 py-3 text-center text-sm font-semibold ${textPrimary}`}>
                    Nutritionist
                  </th>
                  <th className={`px-4 py-3 text-center text-sm font-semibold ${textPrimary}`}>
                    Technician
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${divideBorder}`}>
                {Object.entries(permissionLabels).map(([key, label]) => {
                  const isInteractive = key === 'modifyTests';
                  return (
                    <tr key={key} className={hoverItemBg}>
                      <td className={`px-6 py-3 text-sm ${textPrimary} ${isInteractive ? (darkMode ? 'bg-blue-900/10' : 'bg-blue-50/50') : ''}`}>
                        {label}
                      </td>
                      {['Owner', 'Manager', 'Nutritionist', 'Technician'].map(role => (
                        <td key={role} className={`px-4 py-3 text-center ${isInteractive ? (darkMode ? 'bg-blue-900/10' : 'bg-blue-50/50') : ''}`}>
                          {rolePermissions[role][key as keyof RolePermissions] ? (
                            <div className={`inline-flex items-center justify-center size-5 rounded-full ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                              <div className={`size-2 rounded-full ${darkMode ? 'bg-green-400' : 'bg-green-600'}`}></div>
                            </div>
                          ) : (
                            <div className={`inline-flex items-center justify-center size-5`}>
                              <div className={`size-1.5 rounded-full ${darkMode ? 'bg-[#3C3C3C]' : 'bg-gray-300'}`}></div>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={`px-6 py-3 border-t ${borderColor} ${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-50'} flex items-start gap-2`}>
            <Info className={`size-4 ${textTertiary} mt-0.5 flex-shrink-0`} />
            <p className={`text-xs ${textTertiary}`}>
              Owners have full control. Managers can do everything except delete the organization. Nutritionists can view and download reports. Technicians can only submit new samples.
            </p>
          </div>
        </section>
      </main>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`${cardBg} rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col`}>
            {/* Modal Header */}
            <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between flex-shrink-0`}>
              <h2 className={`text-xl font-semibold ${textPrimary}`}>
                Invite Team Member
              </h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className={`p-2 ${hoverBg} rounded-full transition-colors`}
              >
                <X className={`size-5 ${textSecondary}`} />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="px-6 py-6 space-y-5 overflow-y-auto flex-1">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="invite-email"
                  className={`block text-sm font-medium ${textPrimary} mb-2`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${textTertiary}`}>
                    <Mail className="size-5" />
                  </div>
                  <input
                    id="invite-email"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@example.com"
                    className={`w-full pl-11 pr-4 py-3 border ${inputBorder} ${inputBg} ${textPrimary} rounded-lg focus:ring-2 ${darkMode ? 'focus:ring-green-500/50' : 'focus:ring-green-500'} focus:border-transparent outline-none transition-all`}
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-3`}>
                  Assign Role
                </label>
                <div className="space-y-2">
                  {['Owner', 'Manager', 'Nutritionist', 'Technician'].map((role) => {
                    const isSelected = inviteRole === role;
                    const permissions = rolePermissions[role];
                    const enabledPermissions = Object.entries(permissions)
                      .filter(([_, enabled]) => enabled)
                      .map(([key]) => permissionLabels[key as keyof typeof permissionLabels]);

                    return (
                      <button
                        key={role}
                        onClick={() => setInviteRole(role)}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          isSelected
                            ? `border-2 ${darkMode ? 'border-green-500 bg-green-900/10' : 'border-green-600 bg-green-50'}`
                            : `${darkMode ? 'border-[#3C3C3C] hover:border-[#505050]' : 'border-gray-200 hover:border-gray-300'} ${cardBg}`
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className={`font-semibold ${textPrimary}`}>
                            {role}
                          </div>
                          <div
                            className={`size-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              isSelected
                                ? `${darkMode ? 'border-green-500 bg-green-500' : 'border-green-600 bg-green-600'}`
                                : `${darkMode ? 'border-[#3C3C3C]' : 'border-gray-300'}`
                            }`}
                          >
                            {isSelected && (
                              <div className="size-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <div className={`text-xs ${textTertiary} leading-relaxed`}>
                          Can: {enabledPermissions.join(', ')}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`px-6 py-4 border-t ${borderColor} flex gap-3`}>
              <button
                onClick={() => setShowInviteModal(false)}
                className={`flex-1 px-4 py-3 border ${inputBorder} ${textSecondary} rounded-lg ${hoverItemBg} transition-colors font-medium`}
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvite}
                disabled={!inviteEmail.trim()}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                  inviteEmail.trim()
                    ? `${darkMode ? 'bg-[#2C2C2C] hover:bg-[#333333]' : 'bg-gray-800 hover:bg-gray-900'} text-white`
                    : `${darkMode ? 'bg-[#1E1E1E]' : 'bg-gray-200'} ${textTertiary} cursor-not-allowed`
                }`}
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}