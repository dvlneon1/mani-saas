-- Projeto Mani - Seed Data
-- Default feed folders and anamnese templates

-- ============================================================================
-- DEFAULT FEED FOLDERS
-- Run after creating a professional to add default folders
-- ============================================================================

-- Function to create default folders for new professionals
CREATE OR REPLACE FUNCTION create_default_feed_folders()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO feed_folders (professional_id, name, icon, color, sort_order)
  VALUES
    (NEW.id, 'Para fazer', 'check-square', '#FF6B6B', 1),
    (NEW.id, 'Cores favoritas', 'palette', '#4ECDC4', 2),
    (NEW.id, 'Técnicas para aprender', 'book-open', '#45B7D1', 3),
    (NEW.id, 'Inspiração geral', 'star', '#96CEB4', 4);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create folders on professional insert
DROP TRIGGER IF EXISTS create_default_folders ON professionals;
CREATE TRIGGER create_default_folders
  AFTER INSERT ON professionals
  FOR EACH ROW EXECUTE FUNCTION create_default_feed_folders();

-- ============================================================================
-- DEFAULT ANAMNESE TEMPLATE
-- ============================================================================

-- Function to create default anamnese template for new professionals
CREATE OR REPLACE FUNCTION create_default_anamnese_template()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO anamnese_templates (professional_id, name, fields, is_default)
  VALUES (
    NEW.id,
    'Anamnese Padrão',
    '[
      {
        "id": "health_conditions",
        "type": "multiselect",
        "label": "Condições de saúde",
        "options": ["Diabetes", "Pressão alta", "Alergias", "Sensibilidade", "Nenhuma"],
        "required": false
      },
      {
        "id": "allergies",
        "type": "text",
        "label": "Alergias específicas",
        "placeholder": "Descreva alergias a produtos...",
        "required": false
      },
      {
        "id": "current_medications",
        "type": "textarea",
        "label": "Medicamentos em uso",
        "placeholder": "Liste medicamentos que podem afetar o tratamento...",
        "required": false
      },
      {
        "id": "nail_condition",
        "type": "select",
        "label": "Condição atual das unhas",
        "options": ["Saudáveis", "Quebradiças", "Fracas", "Descamando", "Micas", "Outro"],
        "required": true
      },
      {
        "id": "previous_treatments",
        "type": "textarea",
        "label": "Tratamentos anteriores",
        "placeholder": "Descreva tratamentos anteriores e resultados...",
        "required": false
      },
      {
        "id": "desired_style",
        "type": "text",
        "label": "Estilo desejado",
        "placeholder": "Formato, tamanho, estilo preferido...",
        "required": false
      },
      {
        "id": "maintenance_frequency",
        "type": "select",
        "label": "Frequência de manutenção preferida",
        "options": ["Semanal", "Quinzenal", "Mensal", "Variável"],
        "required": false
      },
      {
        "id": "notes",
        "type": "textarea",
        "label": "Observações gerais",
        "placeholder": "Qualquer informação adicional relevante...",
        "required": false
      }
    ]'::jsonb,
    true
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create template on professional insert
DROP TRIGGER IF EXISTS create_default_anamnese ON professionals;
CREATE TRIGGER create_default_anamnese
  AFTER INSERT ON professionals
  FOR EACH ROW EXECUTE FUNCTION create_default_anamnese_template();

-- ============================================================================
-- SAMPLE DATA FOR TESTING (Optional - comment out in production)
-- ============================================================================

-- Uncomment to insert sample professional for testing
/*
INSERT INTO professionals (id, email, name, phone, business_name, location_type, plan_type)
VALUES (
  uuid_generate_v4(),
  'teste@manicure.com',
  'Maria Silva',
  '11999999999',
  'Studio da Maria',
  'studio',
  'pro'
);
*/
