import re

with open('frontend/src/index.css', 'r') as f:
    content = f.read()

dark_mode_css = """
html.dark .form-input {
  background: #1e293b;
  border-color: #334155;
  color: #f8fafc;
}
html.dark .form-input:focus {
  border-color: #7C3AED;
}
html.dark .form-label {
  color: #94a3b8;
}
html.dark .btn-secondary {
  background: #1e293b;
  color: #f8fafc;
  border-color: #334155;
}
html.dark .btn-secondary:hover {
  background: #334155;
  border-color: #7C3AED;
}
html.dark .btn-ghost {
  color: #cbd5e1;
}
html.dark .btn-ghost:hover {
  color: #f8fafc;
  background: #334155;
}
html.dark .card {
  background: #1e293b;
  border-color: #334155;
}

@media (max-width: 768px) {
  .form-input {
    padding: 10px 12px;
    font-size: 14px;
  }
  .form-label {
    font-size: 11px;
    margin-bottom: 4px;
  }
  .btn-primary, .btn-secondary {
    padding: 10px 20px;
    font-size: 14px;
  }
}
"""

content = content + dark_mode_css

with open('frontend/src/index.css', 'w') as f:
    f.write(content)
