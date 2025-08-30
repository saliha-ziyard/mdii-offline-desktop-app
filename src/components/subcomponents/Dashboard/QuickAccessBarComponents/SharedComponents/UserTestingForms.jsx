import React, { useState } from "react";
import { BsCheckCircle, BsCopy, BsCheckLg } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BiLinkExternal } from "react-icons/bi";

const UserTestingForms = ({ toolMaturity, toolId, onOpenForm }) => {
  const [copiedForm, setCopiedForm] = useState(null);
  
  const maturityLabel = toolMaturity === 'advanced' ? 'Advanced' : 'Early';
  
  // Form URLs based on maturity (from useToolMaturity hook)
  const FORM_URLS = {
    advanced: {
      ut3: "https://ee.kobotoolbox.org/x/oiuVK6X5",
      ut4: "https://ee.kobotoolbox.org/x/hYoPcdik"
    },
    early: {
      ut3: "https://ee.kobotoolbox.org/x/cZrkpqm6",
      ut4: "https://ee.kobotoolbox.org/x/A2LxHiOT"
    }
  };
  
  // Generate complete form URLs with pre-filled tool ID
  const generateFormUrl = (formType) => {
    const baseUrl = FORM_URLS[toolMaturity][formType];
    return `${baseUrl}?&d[group_individualinfo/Q_13110000]=${encodeURIComponent(toolId)}`;
  };
  
  const forms = [
    {
      id: 'ut3',
      title: 'Direct Beneficiaries',
      description: `User Testing Phase 3 - ${maturityLabel} Stage`,
      beneficiaryType: 'direct',
      beneficiaryDescription: 'Users who directly use the tool and it is mandatory for them to use the tool',
      url: generateFormUrl('ut3')
    },
    {
      id: 'ut4', 
      title: 'Indirect Beneficiaries',
      description: `User Testing Phase 4 - ${maturityLabel} Stage`,
      beneficiaryType: 'indirect',
      beneficiaryDescription: 'Users who don\'t use the tool but are impacted by it, or can optionally use the tool',
      url: generateFormUrl('ut4')
    }
  ];

  const handleCopyLink = async (formId, url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedForm(formId);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedForm(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopiedForm(formId);
      setTimeout(() => {
        setCopiedForm(null);
      }, 2000);
    }
  };

  const handleOpenForm = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' 
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
                margin: '0 0 8px 0', 
                fontSize: '14px', 
                color: 'var(--font-grey)' 
              }}>
                {form.description}
              </p>
              
              {/* Beneficiary Type Description */}
              <div style={{
                background: form.beneficiaryType === 'direct' ? 'var(--primary-light, #e3f2fd)' : 'var(--secondary-light, #f3e5f5)',
                border: `1px solid ${form.beneficiaryType === 'direct' ? 'var(--primary-border, #bbdefb)' : 'var(--secondary-border, #e1bee7)'}`,
                borderRadius: '4px',
                padding: '10px 12px',
                marginBottom: '16px',
                fontSize: '13px',
                fontStyle: 'italic',
                color: form.beneficiaryType === 'direct' ? 'var(--primary-dark, #1976d2)' : 'var(--secondary-dark, #7b1fa2)',
                lineHeight: '1.4'
              }}>
                <strong>{form.beneficiaryType === 'direct' ? 'Direct:' : 'Indirect:'}</strong> {form.beneficiaryDescription}
              </div>
              
              {/* Generated Link Display */}
              <div style={{
                background: 'var(--bg-white)',
                border: '1px solid var(--border-colour)',
                borderRadius: '4px',
                padding: '8px 12px',
                marginBottom: '12px',
                fontSize: '12px',
                fontFamily: 'monospace',
                wordBreak: 'break-all',
                color: 'var(--font-grey)'
              }}>
                {form.url}
              </div>
                              <button
                  onClick={() => handleCopyLink(form.id, form.url)}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid var(--border-colour)',
                    borderRadius: 'var(--border-radius)',
                    background: copiedForm === form.id ? 'var(--success-light)' : 'var(--bg-white)',
                    color: copiedForm === form.id ? 'var(--success-dark)' : 'var(--font-dark)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '44px',
                    transition: 'all 0.2s ease'
                  }}
                  type="button"
                  title={copiedForm === form.id ? "Copied!" : "Copy link"}
                >
                  {copiedForm === form.id ? (
                    <BsCheckLg size={16} />
                  ) : (
                    <BsCopy size={16} />
                  )}
                </button>
              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '8px' 
              }}>
                {/* <button
                  onClick={() => handleOpenForm(form.url)}
                  className="innovator-generate-button"
                  style={{ 
                    flex: '1', 
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  type="button"
                >
                  <BiLinkExternal size={16} />
                  Open Form
                </button> */}
                

              </div>
            </div>
          ))}
        </div>

        <div className="innovator-tip" style={{ marginTop: '20px' }}>
          <BsCheckCircle />
          <span>
            Both forms are pre-filled with your Tool ID: <strong>{toolId}</strong>. 
            Share these links directly with your test participants.
          </span>
        </div>
        
        {/* Additional Info */}
        <div style={{
          marginTop: '16px',
          padding: '16px',
          background: 'var(--info-light)',
          border: '1px solid var(--info-border)',
          borderRadius: 'var(--border-radius)',
          fontSize: '14px',
          color: 'var(--info-dark)'
        }}>
        </div>
      </div>
    </section>
  );
};

export default UserTestingForms;