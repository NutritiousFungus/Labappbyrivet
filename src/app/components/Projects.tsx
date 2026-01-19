import { Plus, Users, FolderOpen, ChevronRight } from 'lucide-react';
import { Project } from '@/app/types';

interface ProjectsProps {
  projects: Project[];
  darkMode: boolean;
  onCreateProject: () => void;
  onProjectClick: (projectId: string) => void;
}

export function Projects({ projects, darkMode, onCreateProject, onProjectClick }: ProjectsProps) {
  const textPrimary = darkMode ? 'text-[#E8E8E8]' : 'text-stone-800';
  const textSecondary = darkMode ? 'text-[#C0C0C0]' : 'text-stone-600';
  const textTertiary = darkMode ? 'text-[#909090]' : 'text-stone-400';
  const cardBg = darkMode ? 'bg-[#1E1E1E]' : 'bg-white';
  const hoverBg = darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-stone-50';
  const borderColor = darkMode ? 'border-[#2C2C2C]' : 'border-stone-200';

  const sharedProjects = projects.filter(p => p.isShared);
  const soloProjects = projects.filter(p => !p.isShared);

  // Empty state
  if (projects.length === 0) {
    return (
      <div className="relative pb-20">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className={`${darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-100'} rounded-full p-6 mb-4`}>
            <FolderOpen className={`size-12 ${textTertiary}`} strokeWidth={1.5} />
          </div>
          <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>No Projects Yet</h3>
          <p className={`text-sm ${textSecondary} text-center max-w-md mb-6`}>
            Group samples into projects to analyze trends and collaborate with others
          </p>
        </div>
        
        {/* Create Project Button - Bottom of screen */}
        <div className="fixed bottom-0 left-0 right-0 p-4 z-40">
          <button
            onClick={onCreateProject}
            className={`w-full max-w-2xl mx-auto flex items-center justify-center gap-2 px-6 py-4 ${
              darkMode 
                ? 'bg-[#2A2A2A] hover:bg-[#333333] border border-[#3C3C3C]' 
                : 'bg-white hover:bg-stone-50 border border-stone-200 shadow-lg'
            } rounded-xl font-medium transition-all ${textPrimary}`}
          >
            <Plus className="size-5" />
            Create New Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Projects Explanation Blurb */}
      <div className={`${darkMode ? 'bg-[#2A2A2A]' : 'bg-stone-50'} border ${borderColor} rounded-xl p-4`}>
        <p className={`text-sm ${textSecondary}`}>
          <span className={`font-semibold ${textPrimary}`}>Projects</span> help you organize samples into meaningful groups for trend analysis and collaboration. Shared projects allow multiple organizations to view and contribute samples together.
        </p>
      </div>

      {/* Shared Projects Section */}
      {sharedProjects.length > 0 && (
        <div>
          <h3 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>
            Shared Projects
          </h3>
          <div className="space-y-2">
            {sharedProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => onProjectClick(project.id)}
                className={`w-full ${cardBg} border ${borderColor} rounded-xl p-4 md:p-5 ${hoverBg} transition-all group`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-base md:text-lg font-semibold ${textPrimary}`}>
                        {project.name}
                      </h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm">
                      <span className={textSecondary}>
                        {project.sampleCount} {project.sampleCount === 1 ? 'sample' : 'samples'}
                      </span>
                      {project.sharedWith.length > 0 && (
                        <>
                          <span className={textTertiary}>•</span>
                          <div className="flex items-center gap-1.5">
                            <Users className={`size-3.5 md:size-4 ${textTertiary}`} />
                            <span className={textSecondary}>
                              Shared with {project.sharedWith.map(org => org.name).join(', ')}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <ChevronRight className={`size-5 ${textTertiary} group-hover:translate-x-1 transition-transform flex-shrink-0`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Solo Projects Section */}
      {soloProjects.length > 0 && (
        <div>
          <h3 className={`text-sm font-semibold ${textSecondary} mb-3 uppercase tracking-wide`}>
            Solo Projects
          </h3>
          <div className="space-y-2">
            {soloProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => onProjectClick(project.id)}
                className={`w-full ${cardBg} border ${borderColor} rounded-xl p-4 md:p-5 ${hoverBg} transition-all group`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-base md:text-lg font-semibold ${textPrimary}`}>
                        {project.name}
                      </h4>
                    </div>
                    <div className="text-xs md:text-sm">
                      <span className={textSecondary}>
                        {project.sampleCount} {project.sampleCount === 1 ? 'sample' : 'samples'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`size-5 ${textTertiary} group-hover:translate-x-1 transition-transform flex-shrink-0`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Create Project Button - Bottom of screen */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-40">
        <button
          onClick={onCreateProject}
          className={`w-full max-w-2xl mx-auto flex items-center justify-center gap-2 px-6 py-4 ${
            darkMode 
              ? 'bg-[#2A2A2A] hover:bg-[#333333] border border-[#3C3C3C]' 
              : 'bg-white hover:bg-stone-50 border border-stone-200 shadow-lg'
          } rounded-xl font-medium transition-all ${textPrimary}`}
        >
          <Plus className="size-5" />
          Create New Project
        </button>
      </div>
    </div>
  );
}