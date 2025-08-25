import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const UserTestingForms = ({ toolMaturity, toolId, onOpenForm }) => {
  const maturityLabel = toolMaturity === 'advanced' ? 'Advanced' : 'Early';
  
  const forms = [
    {
      id: 'ut3',
      title: 'UT3 Form',
      description: `User Testing Phase 3 - ${maturityLabel} Stage`
    },
    {
      id: 'ut4', 
      title: 'UT4 Form',
      description: `User Testing Phase 4 - ${maturityLabel} Stage`
    }
  ];

  return (
    <section className="innovator-section">
      <div className="innovator-section-header">
        <HiOutlineClipboardDocumentList />
        <div>
          <h2>User Testing Forms</h2>
          <p>
            Available forms for <strong>{maturityLabel} Stage</strong> tools
          </p>
        </div>
      </div>

      <div className="innovator-form-content">
        <div style={{ 
          display: 'grid', 
          gap: '16px', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' 
        }}>
          {forms.map((form) => (
            <div
              key={form.id}
              style={{ 
                padding: '20px', 
                border: '1px solid var(--border-colour)', 
                borderRadius: 'var(--border-radius)',
                background: 'var(--bg-grey)'
              }}
            >
              <h3 style={{ 
                margin: '0 0 8px 0', 
                fontSize: '18px', 
                fontWeight: '600' 
              }}>
                {form.title}
              </h3>
              <p style={{ 
                margin: '0 0 16px 0', 
                fontSize: '14px', 
                color: 'var(--font-grey)' 
              }}>
                {form.description}
              </p>
              <button
                onClick={() => onOpenForm(form.id)}
                className="innovator-generate-button"
                style={{ width: '100%', padding: '10px' }}
                type="button"
              >
                Open {form.title}
              </button>
            </div>
          ))}
        </div>

        <div className="innovator-tip" style={{ marginTop: '20px' }}>
          <BsCheckCircle />
          <span>
            Both forms are pre-filled with your Tool ID: <strong>{toolId}</strong>
          </span>
        </div>
      </div>
    </section>
  );
};

export default UserTestingForms;