import sys
import os
import requests
from pathlib import Path
import shutil
import openpyxl
import time
import json
from collections import defaultdict

# ==== CONFIG ====
API_TOKEN = "fc37a9329918014ef595b183adcef745a4beb217"
BASE_URL = "https://kf.kobotoolbox.org/api/v2"

# Main form for tool information
MAIN_FORM_ID = "aJn2DsjpAeJjrB6VazHjtz"
TOOL_ID_FIELD = "ID"
MATURITY_FIELD = "tool_maturity"
TOOL_NAME_FIELD = "tool_name"

# Additional survey forms
SURVEY_FORMS = {
    "project_management": "auq274db5dfNGasdH4bWdU",
    "project_leader": "afiUqEoYaGMS8RaygTPuAR", 
    "technical_manager": "aqxEbPgQTMQQqe42ZFW2cc"
}

# Second tool ID field for survey forms
SURVEY_TOOL_ID_FIELD = "Q_13110000"

# Get the directory where this script is located
SCRIPT_DIR = Path(__file__).parent.absolute()
TEMPLATES = {
    "early": SCRIPT_DIR / "templates" / "MDII_OfflineToolKIT_EAV.xlsm",
    "advanced": SCRIPT_DIR / "templates" / "MDII_OfflineToolKIT_RV.xlsm",
}

OUTPUT_DIR = Path(os.path.expanduser("~/Downloads"))

# Question type definitions
DEPENDENT_CODES = {
    "13221110", "13221120", "13221130", "13221140", "13221141", "13221200",
    "13221210", "13221211", "13221212", "13221213", "13221220", "13271111",
    "13271121", "13271131", "13271141", "13271151", "13271161", "13271210",
    "13271310", "13271410", "13231100", "13232100", "13233100", "13234100",
    "13235100", "13236100", "13272410", "14222000"
}

EVIDENCE_UPLOAD_CODES = {
    "14111100", "14313100", "14121100", "14322100", "14122100", "14143100",
    "14212100", "14224100", "14233100", "14332100", "14234100", "14334100",
    "14411100", "14422100", "14431100", "14432100", "14513100", "14522100",
    "14531100", "14612100", "14622100", "14632100", "14712100", "14723100",
    "14731100"
}

YES_NO_CODES = {
    "13210000", "13211100", "13220000", "13230000", "13270000", "13271100",
    "13271200", "13271300", "13271400", "13272000", "13272100", "13272200",
    "13272300", "13272400", "13272500", "14100000", "14110000", "14120000",
    "14130000", "14140000", "14200000", "14210000", "14220000", "14230000",
    "14300000", "14310000", "14320000", "14330000", "14400000", "14410000",
    "14420000", "14430000", "14500000", "14510000", "14520000", "14530000",
    "14600000", "14610000", "14620000", "14630000", "14700000", "14710000",
    "14720000", "14730000"
}

MULTI_SELECT_CODES = {
    "13111000", "13112000", "13121000", "13122000", "13131000", "13132000",
    "13141000", "13142000", "13151000", "13152000", "13153000", "13161000",
    "13162000", "13171000", "13172000", "13173000", "13181000", "13182000",
    "13191000", "13192000"
}

# Technology type mapping for Q_13230000
TECHNOLOGY_TYPES = {
    "iot": "What type of technology does the digital tool use? IoT and Connectivity*",
    "connectivity": "What type of technology does the digital tool use? IoT and Connectivity*",
    "geospatial": "What type of technology does the digital tool use? GeoSpatial*",
    "gis": "What type of technology does the digital tool use? GeoSpatial*",
    "agrispecific": "What type of technology does the digital tool use? AgriSpecific*",
    "agriculture": "What type of technology does the digital tool use? AgriSpecific*",
    "cloud": "What type of technology does the digital tool use? Cloud and Blockchain*",
    "blockchain": "What type of technology does the digital tool use? Cloud and Blockchain*",
    "storage": "What type of technology does the digital tool use? Storage and Logistics*",
    "logistics": "What type of technology does the digital tool use? Storage and Logistics*",
    "data_analysis": "What type of technology does the digital tool use? Data Processing and Analysis*",
    "data_processing": "What type of technology does the digital tool use? Data Processing and Analysis*",
    "artificial_intelligence": "What type of technology does the digital tool use? Data Processing and Analysis*",
    "big_data": "What type of technology does the digital tool use? Data Processing and Analysis*",
    "data_analytics": "What type of technology does the digital tool use? Data Processing and Analysis*",
    "data_mining": "What type of technology does the digital tool use? Data Processing and Analysis*"
}

# ==== FUNCTIONS ====

def debug_print(*args, **kwargs):
    """Print debug info to stderr"""
    print(*args, file=sys.stderr, **kwargs)
    sys.stderr.flush()

def fetch_kobo_data(form_id):
    """Fetch data from Kobo API using the working .json endpoint"""
    headers = {
        "Authorization": f"Token {API_TOKEN}",
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    
    url = f"{BASE_URL}/assets/{form_id}/data.json"
    debug_print(f"Fetching data from form {form_id}: {url}")
    
    try:
        resp = requests.get(url, headers=headers, timeout=30)
        debug_print(f"Status: {resp.status_code}")
        
        if resp.status_code == 200:
            try:
                data = resp.json()
                results = data.get("results", [])
                debug_print(f"SUCCESS! Found {len(results)} records for form {form_id}")
                return results
            except json.JSONDecodeError as e:
                debug_print(f"JSON decode error: {e}")
                raise Exception(f"Failed to parse JSON response: {e}")
        
        elif resp.status_code == 401:
            raise Exception("Authentication failed. Check your API token.")
        elif resp.status_code == 403:
            raise Exception(f"Access forbidden. Check permissions for form ID: {form_id}")
        elif resp.status_code == 404:
            raise Exception(f"Form not found. Check form ID: {form_id}")
        else:
            raise Exception(f"HTTP {resp.status_code}: {resp.text[:200]}...")
            
    except requests.exceptions.RequestException as e:
        debug_print(f"Network error: {e}")
        raise Exception(f"Network error: {e}")

def find_tool_record(tool_id):
    """Find the main tool record"""
    try:
        data = fetch_kobo_data(MAIN_FORM_ID)
    except Exception as e:
        raise Exception(f"Failed to fetch main form data: {e}")
        
    debug_print(f"Looking for tool ID: '{tool_id}'")
    debug_print(f"Total records to search: {len(data)}")
    
    for i, record in enumerate(data):
        record_id = str(record.get(TOOL_ID_FIELD, "")).strip()
        
        if record_id == str(tool_id).strip():
            debug_print(f"Found matching record at position {i}!")
            debug_print(f"Tool name: {record.get(TOOL_NAME_FIELD, 'N/A')}")
            debug_print(f"Maturity: {record.get(MATURITY_FIELD, 'N/A')}")
            return record
    
    debug_print("No matching record found.")
    return None

def find_survey_records(tool_id):
    """Find records from all survey forms that match the tool ID"""
    survey_data = {}
    
    for survey_name, form_id in SURVEY_FORMS.items():
        try:
            debug_print(f"Fetching {survey_name} survey data...")
            data = fetch_kobo_data(form_id)
            
            # Look for records matching the tool ID using the survey-specific field
            matching_records = []
            for record in data:
                # Try multiple possible field paths for tool ID
                record_tool_id = ""
                if "group_requester/Q_13110000" in record:
                    record_tool_id = str(record["group_requester/Q_13110000"]).strip()
                elif SURVEY_TOOL_ID_FIELD in record:
                    record_tool_id = str(record[SURVEY_TOOL_ID_FIELD]).strip()
                elif 'group_requester' in record and isinstance(record['group_requester'], dict):
                    record_tool_id = str(record['group_requester'].get('Q_1311000', '')).strip()
                
                debug_print(f"Survey {survey_name} record ID: '{record_tool_id}'")
                if record_tool_id == str(tool_id).strip():
                    matching_records.append(record)
            
            debug_print(f"Found {len(matching_records)} matching records for {survey_name}")
            survey_data[survey_name] = matching_records
            
        except Exception as e:
            debug_print(f"Warning: Could not fetch {survey_name} survey data: {e}")
            survey_data[survey_name] = []
    
    return survey_data

def get_answer_for_question(question_id, survey_data):
    """Get the answer for a specific question ID from survey data"""
    debug_print(f"Looking for answer to question: {question_id}")
    
    # Create a combined dataset from all survey forms
    all_records = []
    for survey_name, records in survey_data.items():
        for record in records:
            all_records.append(record)
    
    if not all_records:
        debug_print(f"No survey records available for question {question_id}")
        return "The Innovator Didn't Provide an answer for this Question"
    
    # Search for the question in all records
    for record in all_records:
        answer = find_answer_in_record(question_id, record)
        if answer:
            debug_print(f"Found answer for {question_id}: {answer}")
            return answer
    
    # Check if it's a dependent question that should show special message
    question_code = question_id.replace("Q_", "")
    if question_code in DEPENDENT_CODES:
        return "-- --"
    
    # Check if it's an evidence upload question
    if question_code in EVIDENCE_UPLOAD_CODES:
        return "The Innovator Didn't Upload Any Evidence for this Question"
    
    return "The Innovator Didn't Provide an answer for this Question"

def find_answer_in_record(question_id, record):
    """Find answer for question ID in a single record"""
    
    # Handle special case for Q_13230000 (technology types)
    if question_id == "Q_13230000":
        return handle_technology_question(record)
    
    # Search in different possible field paths
    possible_paths = [
        question_id,
        f"group_requester/{question_id}",
        f"group_institutionalinfo/{question_id}",
        f"group_tooldetails/{question_id}",
        f"group_used_technologies/{question_id}",
        f"group_socialconsequences/{question_id}",
        f"group_toolusage/{question_id}",
        f"group_governance/{question_id}",
        f"group_goals/{question_id}",
        f"group_evalrequest/{question_id}"
    ]
    
    for path in possible_paths:
        if path in record:
            value = record[path]
            if value is not None and str(value).strip():
                # Handle different answer types
                processed_answer = process_answer(question_id, value)
                if processed_answer:
                    debug_print(f"Found answer for {question_id} at path {path}: {processed_answer[:50]}...")
                    return processed_answer
    
    return None

def handle_technology_question(record):
    """Handle the special Q_13230000 technology question with multiple sub-types"""
    tech_field = "group_used_technologies/Q_13230000"
    if tech_field not in record:
        return None
    
    tech_values = str(record[tech_field]).strip()
    if not tech_values:
        return None
    
    # Split by spaces to get individual technology types
    tech_types = tech_values.split()
    
    # Create responses for each technology type question
    responses = []
    
    # Check each technology type and see if it matches our categories
    for tech_type in tech_types:
        tech_lower = tech_type.lower()
        for key, question_text in TECHNOLOGY_TYPES.items():
            if key in tech_lower:
                responses.append(f"{question_text}: Yes")
                break
    
    if responses:
        return "; ".join(responses)
    
    return f"Technology types: {tech_values}"

def process_answer(question_id, value):
    """Process the answer based on question type"""
    if value is None:
        return None
    
    value_str = str(value).strip()
    if not value_str:
        return None
    
    # Handle n/a answers
    if value_str.lower() in ['n/a', 'na', 'not applicable']:
        return "The Innovator answered that this Question was not Applicable to their Context"
    
    question_code = question_id.replace("Q_", "")
    
    # Handle yes/no questions
    if question_code in YES_NO_CODES:
        if value_str.lower() in ['yes', 'y', '1', 'true']:
            return "Yes"
        elif value_str.lower() in ['no', 'n', '0', 'false']:
            return "No"
    
    # Handle multi-select questions
    if question_code in MULTI_SELECT_CODES:
        # Replace underscores with spaces and split by spaces
        items = value_str.replace('_', ' ').split()
        return ", ".join(items)
    
    # For all other questions, return the value as-is
    return value_str

def copy_and_fill_template(template_path, output_path, tool_name, tool_id, maturity_label, maturity_key, survey_data):
    debug_print(f"Copying template from: {template_path}")
    debug_print(f"Output will be: {output_path}")
    
    # Ensure output directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    try:
        shutil.copy(template_path, output_path)
        debug_print("Template copied successfully.")
    except Exception as e:
        debug_print(f"Error copying template: {e}")
        raise Exception(f"Failed to copy template: {e}")

    try:
        debug_print("Opening workbook...")
        wb = openpyxl.load_workbook(output_path, keep_vba=True)
        
        # Look for the correct worksheet
        target_sheet_names = ["Innovator Answers", "InnovatorAnswers", "Innovator_Answers"]
        ws = None
        
        debug_print(f"Available worksheets: {[sheet.title for sheet in wb.worksheets]}")
        
        for sheet_name in target_sheet_names:
            if sheet_name in wb.sheetnames:
                ws = wb[sheet_name]
                debug_print(f"Found target worksheet: {ws.title}")
                break
        
        if ws is None:
            ws = wb.active
            debug_print(f"Using active worksheet: {ws.title}")
            debug_print("Warning: Could not find 'Innovator Answers' sheet, using active sheet")
        
        debug_print(f"Filling template with:")
        debug_print(f"  Tool name: {tool_name}")
        debug_print(f"  Tool ID: {tool_id}")
        debug_print(f"  Maturity: {maturity_label}")
        debug_print(f"  Template type: {maturity_key}")

        def safe_set_cell_value(worksheet, cell_ref, value):
            """Safely set cell value, handling merged cells"""
            try:
                cell = worksheet[cell_ref]
                if hasattr(cell, 'coordinate') and cell.coordinate in worksheet.merged_cells:
                    # Find the top-left cell of the merged range
                    for merged_range in worksheet.merged_cells.ranges:
                        if cell.coordinate in merged_range:
                            top_left_cell = worksheet.cell(merged_range.min_row, merged_range.min_col)
                            top_left_cell.value = value
                            debug_print(f"  Set merged cell {cell_ref} (top-left: {top_left_cell.coordinate}) = {str(value)[:50]}...")
                            return
                else:
                    cell.value = value
                    debug_print(f"  Set cell {cell_ref} = {str(value)[:50]}...")
            except Exception as e:
                debug_print(f"  Warning: Could not set {cell_ref} = {str(value)[:30]}..., error: {e}")

        def fill_header_info(worksheet):
            """Fill the header information (tool name, ID, maturity)"""
            debug_print("Setting header information...")
            
            if maturity_key == "advanced":
                debug_print("Using advanced template cell positions")
                hardcoded_positions = [
                    ("K16", f"Digital Tool Name: {tool_name}"),
                    ("K17", f"Internal Innovation Code: {tool_id}"),
                    ("K18", f"MDII Version: {maturity_label}"),
                ]
            else:
                debug_print("Using early stage template cell positions")
                hardcoded_positions = [
                    ("J16", f"Digital Tool Name: {tool_name}"),
                    ("J17", f"Internal Innovation Code: {tool_id}"),
                    ("J18", f"MDII Version: {maturity_label}"),
                ]
            
            for cell_ref, value in hardcoded_positions:
                safe_set_cell_value(worksheet, cell_ref, value)

        def fill_survey_answers(worksheet):
            """Fill survey answers by reading question codes from the sheet"""
            debug_print("=== STARTING SURVEY ANSWER FILLING ===")
            debug_print(f"Maturity key: {maturity_key}")
            
            # Determine column positions based on maturity
            if maturity_key == "advanced":
                code_col = 9   # I
                question_col = 11  # K
                answer_col = 12  # L
                debug_print("Using ADVANCED template column mapping:")
            else:
                code_col = 8   # H
                question_col = 10  # J
                answer_col = 11  # K
                debug_print("Using EARLY template column mapping:")
            
            debug_print(f"  Code column: {chr(64 + code_col)} (column {code_col})")
            debug_print(f"  Question text column: {chr(64 + question_col)} (column {question_col})")
            debug_print(f"  Answer column: {chr(64 + answer_col)} (column {answer_col})")
            
            start_row = 19
            max_row = worksheet.max_row or 500  # Safety limit
            debug_print(f"  Processing rows {start_row} to {max_row}")
            
            # Check if we have any survey data for this tool
            has_data = any(len(records) > 0 for records in survey_data.values())
            debug_print(f"  Has survey data: {has_data}")
            if has_data:
                total_records = sum(len(records) for records in survey_data.values())
                debug_print(f"  Total survey records: {total_records}")
            
            # First, let's examine the first few rows to understand the structure
            debug_print("=== EXAMINING SHEET STRUCTURE ===")
            for row_num in range(start_row, min(start_row + 10, max_row + 1)):
                code_value = worksheet.cell(row_num, code_col).value
                question_text = worksheet.cell(row_num, question_col).value
                current_answer = worksheet.cell(row_num, answer_col).value
                
                debug_print(f"Row {row_num}: Code='{code_value}' | Question='{str(question_text)[:50] if question_text else None}...' | Current Answer='{current_answer}'")
            
            # Combine all records
            all_records = []
            for records in survey_data.values():
                all_records.extend(records)
            
            # Fetch technology values once
            tech_values = ""
            for record in all_records:
                tech_field = "group_used_technologies/Q_13230000"
                if tech_field in record and record[tech_field]:
                    tech_values = str(record[tech_field]).strip()
                    break
            tech_types_lower = [t.lower() for t in tech_values.split() if t]
            debug_print(f"Technology values found: '{tech_values}'")
            debug_print(f"Tech types (lowercase): {tech_types_lower}")
            
            # Group technology keys by their question text
            tech_keys_by_text = defaultdict(list)
            for key, text in TECHNOLOGY_TYPES.items():
                tech_keys_by_text[text].append(key)
            
            debug_print("=== PROCESSING ANSWERS ===")
            # Clear all existing answers in the answer column first
            debug_print("Clearing existing template answers...")
            for row_num in range(start_row, max_row + 1):
                answer_cell_ref = f"{chr(64 + answer_col)}{row_num}"
                safe_set_cell_value(worksheet, answer_cell_ref, "")
            
            # Iterate through rows and fill answers
            row = start_row
            answers_filled = 0
            questions_processed = 0
            
            while row <= max_row:
                code_value = worksheet.cell(row, code_col).value
                question_text_full = str(worksheet.cell(row, question_col).value or "").strip()
                
                if code_value is None and not question_text_full:
                    row += 1
                    continue  # Skip completely empty rows
                
                questions_processed += 1
                
                if code_value:
                    code_str = str(code_value).strip()
                    if len(code_str) == 8 and code_str.isdigit():
                        question_id = "Q_" + code_str
                        debug_print(f"Processing question {question_id} at row {row}")
                        
                        if has_data:
                            if question_id == "Q_13230000":
                                # Do not set answer for the main technology question row
                                debug_print(f"  Skipping main tech question {question_id}")
                                pass
                            else:
                                answer = get_answer_for_question(question_id, survey_data)
                                answer_cell_ref = f"{chr(64 + answer_col)}{row}"
                                safe_set_cell_value(worksheet, answer_cell_ref, answer)
                                debug_print(f"  Set answer at {answer_cell_ref}: {answer}")
                                answers_filled += 1
                        else:
                            debug_print(f"  No data available for {question_id}")
                else:
                    # No code, check if it's a technology sub-question
                    if question_text_full in tech_keys_by_text and has_data:
                        keys_for_this = tech_keys_by_text[question_text_full]
                        if set(tech_types_lower) & set(keys_for_this):
                            answer = "Yes"
                        else:
                            answer = "No"
                        answer_cell_ref = f"{chr(64 + answer_col)}{row}"
                        safe_set_cell_value(worksheet, answer_cell_ref, answer)
                        debug_print(f"  Set tech sub-question at {answer_cell_ref}: {answer}")
                        answers_filled += 1
                
                row += 1
            
            debug_print(f"=== FILLING COMPLETE ===")
            debug_print(f"Questions processed: {questions_processed}")
            debug_print(f"Answers filled: {answers_filled}")

        # Fill the template
        fill_header_info(ws)
        fill_survey_answers(ws)

        debug_print("Saving workbook...")
        wb.save(output_path)
        debug_print("Workbook saved successfully.")
        
    except Exception as e:
        debug_print(f"Error working with Excel file: {e}")
        import traceback
        debug_print(f"Full traceback: {traceback.format_exc()}")
        raise Exception(f"Excel processing failed: {e}")

def main():
    if len(sys.argv) < 2:
        debug_print("Usage: python main.py <TOOL_ID>")
        debug_print("Example: python main.py MDII-Tumaini-220725")
        print("Error: Missing tool ID argument")
        sys.exit(1)

    tool_id = sys.argv[1]
    debug_print(f"Processing Tool ID: {tool_id}")
    debug_print(f"Script directory: {SCRIPT_DIR}")
    debug_print(f"Output directory: {OUTPUT_DIR}")

    # Check if templates exist
    missing_templates = []
    for key, path in TEMPLATES.items():
        debug_print(f"Checking template: {path}")
        if not path.exists():
            missing_templates.append(str(path))

    if missing_templates:
        error_msg = f"Templates not found: {missing_templates}"
        debug_print(f"Error: {error_msg}")
        print(f"Error: {error_msg}")
        sys.exit(1)

    # Find main tool record
    try:
        record = find_tool_record(tool_id)
    except Exception as e:
        debug_print(f"Error fetching data from Kobo: {e}")
        print(f"Error: {e}")
        sys.exit(1)

    if not record:
        error_msg = f"Tool ID '{tool_id}' not found in main form data."
        debug_print(f"Error: {error_msg}")
        print(f"Error: {error_msg}")
        sys.exit(1)

    # Find survey records
    debug_print("Fetching survey data...")
    try:
        survey_data = find_survey_records(tool_id)
    except Exception as e:
        debug_print(f"Error fetching survey data: {e}")
        print(f"Error: {e}")
        sys.exit(1)

    # Determine maturity level and template
    maturity_value = str(record.get(MATURITY_FIELD, "")).strip()
    debug_print(f"Maturity value from Kobo: '{maturity_value}'")
    
    if maturity_value == "early_stage":
        maturity_key = "early"
        maturity_label = "Early Stage"
    elif maturity_value == "advance_stage":
        maturity_key = "advanced"
        maturity_label = "Advanced Stage"
    else:
        debug_print(f"Warning: Unknown maturity level '{maturity_value}', defaulting to advanced")
        maturity_key = "advanced"
        maturity_label = "Advanced Stage"

    template_path = TEMPLATES[maturity_key]
    tool_name = record.get(TOOL_NAME_FIELD, "Unknown Tool")
    
    # Create output filename with new folder structure
    safe_tool_id = tool_id.replace("/", "_").replace("\\", "_").replace(":", "_")

    # Create the folder structure: toolid/innovator/
    tool_folder = OUTPUT_DIR / safe_tool_id / "Innovator"
    tool_folder.mkdir(parents=True, exist_ok=True)

    output_path = tool_folder / f"{safe_tool_id}_MDII_Toolkit.xlsm"

    try:
        copy_and_fill_template(template_path, output_path, tool_name, tool_id, maturity_label, maturity_key, survey_data)
        # Print success message and file path for Electron to capture
        debug_print(f"SUCCESS! File created at: {output_path}")
        print(str(output_path))  # This is what Electron captures
        
    except Exception as e:
        debug_print(f"Error creating toolkit: {e}")
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()