#!/usr/bin/env python3
import sys
import os
import requests
from pathlib import Path
import shutil
import openpyxl
import time
import json
from collections import defaultdict
import re
import xlwings as xw

# Import PDF generation functions from separate module
from pdf_generator import generate_pdfs_from_excel

def verify_template_integrity(template_path):
    """Verify the template file is valid and has connections"""
    import zipfile
    try:
        debug_print(f"Verifying template: {template_path}")
        debug_print(f"File exists: {template_path.exists()}")
        
        if not template_path.exists():
            debug_print("✗ Template file does not exist!")
            return False
            
        file_size = template_path.stat().st_size
        debug_print(f"File size: {file_size} bytes")
        
        # Check if it's a valid ZIP (Excel files are ZIP archives)
        if zipfile.is_zipfile(template_path):
            debug_print("✓ Template is a valid Excel file (ZIP format)")
            with zipfile.ZipFile(template_path, 'r') as zip_ref:
                # Check for connections
                files = zip_ref.namelist()
                connection_files = [f for f in files if 'connection' in f.lower() or 'query' in f.lower()]
                debug_print(f"Found {len(connection_files)} connection-related files:")
                for cf in connection_files:
                    debug_print(f"  - {cf}")
                    
                if len(connection_files) == 0:
                    debug_print("⚠ WARNING: No connection files found in template!")
                    
            return True
        else:
            debug_print("✗ Template is NOT a valid Excel file!")
            return False
    except Exception as e:
        debug_print(f"✗ Error verifying template: {e}")
        return False

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

# UserTypeII survey forms for different maturity levels
USERTYPE2_FORMS = {
    "advanced": "ap6dUEDwX7KUsKLFZUD7kb",
    "early": "au52CRd6ATzV7S36WcAdDu"
}

# UserTypeIII survey forms for different maturity levels
USERTYPE3_FORMS = {
    "advanced": "aFfhFi5vpsierwc3b5SNvc",
    "early": "aCAhpbKYdsMbnGcWo4yR42"
}

# UserTypeIV survey forms for different maturity levels
USERTYPE4_FORMS = {
    "advanced": "aU5LwrZps9u7Yt7obeShjv", 
    "early": "aKhnEosysRHsrUKxanCSKc"
}

SURVEY_TOOL_ID_FIELD = "Q_13110000"

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

def get_script_directory():
    """Get the directory where this script is located, handling PyInstaller bundle"""
    if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
        return Path(sys._MEIPASS)
    else:
        return Path(__file__).parent.absolute()

def get_templates_directory():
    """Get the templates directory, checking multiple possible locations"""
    env_path = os.environ.get('TEMPLATES_PATH')
    if env_path and Path(env_path).exists():
        return Path(env_path)
    
    script_dir = get_script_directory()
    templates_dir = script_dir / "templates"
    if templates_dir.exists():
        debug_print(f"Found templates in bundle: {templates_dir}")
        return templates_dir
    
    if getattr(sys, 'frozen', False):
        exe_dir = Path(sys.executable).parent
        templates_dir = exe_dir / "templates"
        if templates_dir.exists():
            debug_print(f"Found templates alongside exe: {templates_dir}")
            return templates_dir
    
    debug_print(f"Using development templates path: {script_dir / 'templates'}")
    return script_dir / "templates"

SCRIPT_DIR = get_script_directory()
TEMPLATES_DIR = get_templates_directory()

TEMPLATES = {
    "early": TEMPLATES_DIR / "MDII_OfflineToolKIT_EAV.xlsm",
    "advanced": TEMPLATES_DIR / "MDII_OfflineToolKIT_RV.xlsm",
}

OUTPUT_DIR = Path(os.path.expanduser("~/Downloads"))

def debug_print(*args, **kwargs):
    """Print debug info to stderr"""
    print(*args, file=sys.stderr, **kwargs)
    sys.stderr.flush()

def fetch_kobo_data(form_id):
    """Fetch data from Kobo API"""
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
            data = resp.json()
            results = data.get("results", [])
            debug_print(f"SUCCESS! Found {len(results)} records for form {form_id}")
            return results
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
    data = fetch_kobo_data(MAIN_FORM_ID)
    debug_print(f"Looking for tool ID: '{tool_id}'")
    debug_print(f"Total records to search: {len(data)}")
    
    for i, record in enumerate(data):
        record_id = str(record.get(TOOL_ID_FIELD, "")).strip()
        if record_id == str(tool_id).strip():
            debug_print(f"Found matching record at position {i}!")
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
            
            matching_records = []
            for record in data:
                record_tool_id = ""
                if "group_requester/Q_13110000" in record:
                    record_tool_id = str(record["group_requester/Q_13110000"]).strip()
                elif SURVEY_TOOL_ID_FIELD in record:
                    record_tool_id = str(record[SURVEY_TOOL_ID_FIELD]).strip()
                elif 'group_requester' in record and isinstance(record['group_requester'], dict):
                    record_tool_id = str(record['group_requester'].get('Q_1311000', '')).strip()
                
                if record_tool_id == str(tool_id).strip():
                    matching_records.append(record)
            
            debug_print(f"Found {len(matching_records)} matching records for {survey_name}")
            survey_data[survey_name] = matching_records
            
        except Exception as e:
            debug_print(f"Warning: Could not fetch {survey_name} survey data: {e}")
            survey_data[survey_name] = []
    
    return survey_data

def handle_technology_question(record):
    """Handle the special Q_13230000 technology question with multiple sub-types"""
    tech_field = "group_used_technologies/Q_13230000"
    if tech_field not in record:
        return None
    
    tech_values = str(record[tech_field]).strip()
    if not tech_values:
        return None
    
    tech_types = tech_values.split()
    responses = []
    
    for tech_type in tech_types:
        tech_lower = tech_type.lower()
        for key, question_text in TECHNOLOGY_TYPES.items():
            if key in tech_lower:
                responses.append(f"{question_text}: Yes")
                break
    
    return "; ".join(responses) if responses else f"Technology types: {tech_values}"

def process_answer(question_id, value):
    """Process the answer based on question type"""
    if value is None:
        return None
    
    value_str = str(value).strip()
    if not value_str:
        return None
    
    if value_str.lower() in ['n/a', 'na', 'not applicable']:
        return "The Innovator answered that this Question was not Applicable to their Context"
    
    question_code = question_id.replace("Q_", "")
    
    if question_code in MULTI_SELECT_CODES:
        items = value_str.replace('_', ' ').split()
        return ", ".join(items)
    
    return value_str

def find_answer_in_record(question_id, record):
    """Find answer for question ID in a single record"""
    if question_id == "Q_13230000":
        return handle_technology_question(record)
    
    possible_paths = [
        question_id,
        f"group_requester/{question_id}",
        f"group_tooldetails/{question_id}",
        f"group_toolapplication/{question_id}",
        f"group_toolmetadata/{question_id}",
        f"group_usedtechnologies/{question_id}",
        f"group_wapordetails/{question_id}",
        f"group_financialinfo/{question_id}",
        f"group_enduserscategorization/{question_id}",
        f"group_actionsforinclusion/{question_id}",
        f"group_socialconsequences/{question_id}",
        f"group_toolusage/{question_id}",
        f"group_governance/{question_id}",
        f"group_used_technologies/{question_id}",
        f"group_evalrequest/{question_id}",
        f"group_institutionalinfo/{question_id}",
        f"group_goals/{question_id}",
    ]
    
    for path in possible_paths:
        if path in record:
            value = record[path]
            if value is not None and str(value).strip():
                processed_answer = process_answer(question_id, value)
                if processed_answer:
                    return processed_answer
    
    return None

def get_answer_for_question(question_id, survey_data):
    """Get the answer for a specific question ID from survey data"""
    all_records = []
    for survey_name, records in survey_data.items():
        all_records.extend(records)
    
    if not all_records:
        return "The Innovator Didn't Provide an answer for this Question"
    
    for record in all_records:
        answer = find_answer_in_record(question_id, record)
        if answer:
            return answer
    
    question_code = question_id.replace("Q_", "")
    if question_code in DEPENDENT_CODES:
        return "-- --"
    if question_code in EVIDENCE_UPLOAD_CODES:
        return "The Innovator Didn't Upload Any Evidence for this Question"
    
    return "The Innovator Didn't Provide an answer for this Question"


def fill_usertype_sheet_in_session(wb, tool_id, maturity_key, usertype_num, form_dict):
    """Fill UserType sheet within an already-open xlwings workbook session"""
    
    # Determine which getter function to use
    if usertype_num == 2:
        get_answer_func = get_usertype2_answer_from_record
        sheet_names = ["UserTypeII_Answers", "UserType2_Answers", "UserType_II_Answers"]
    elif usertype_num == 3:
        get_answer_func = get_usertype3_answer_from_record
        sheet_names = ["UserTypeIII_Answers", "UserType3_Answers", "UserType_III_Answers"]
    elif usertype_num == 4:
        get_answer_func = get_usertype4_answer_from_record
        sheet_names = ["UserTypeIV_Answers", "UserType4_Answers", "UserType_IV_Answers"]
    else:
        debug_print(f"Invalid UserType number: {usertype_num}")
        return False
    
    form_id = form_dict.get(maturity_key)
    if not form_id:
        debug_print(f"No UserType{usertype_num} form ID for maturity: {maturity_key}")
        return False
    
    try:
        # Fetch data
        usertype_data = fetch_kobo_data(form_id)
        debug_print(f"Fetched {len(usertype_data)} records from UserType{usertype_num} form")
        
        # Find matching records
        matching_records = []
        possible_fields = [
            "group_toolid/Q_13110000",
            "group_intro/Q_13110000",
            "group_requester/Q_13110000",
            "Q_13110000",
            "group_requester/Q_1311000",
            "group_individualinfo/Q_13110000"
        ]
        
        for record in usertype_data:
            record_tool_id = ""
            for field in possible_fields:
                if field in record and record[field]:
                    record_tool_id = str(record[field]).strip()
                    break
            
            if record_tool_id.lower().strip() == str(tool_id).lower().strip():
                matching_records.append(record)
        
        debug_print(f"Found {len(matching_records)} matching UserType{usertype_num} records")
        
        if not matching_records:
            debug_print(f"No matching records for UserType{usertype_num}")
            return False
        
        # Find the sheet
        usertype_sheet = None
        for sheet_name in sheet_names:
            try:
                usertype_sheet = wb.sheets[sheet_name]
                debug_print(f"Found sheet: {sheet_name}")
                break
            except Exception:
                continue
        
        if not usertype_sheet:
            debug_print(f"UserType{usertype_num} sheet not found in workbook")
            return False
        
        # Read row 2 to find question codes
        row2_values = usertype_sheet.range((2, 1), (2, 200)).value
        if not row2_values:
            debug_print("Could not read row 2")
            return False
        
        question_codes_map = {}
        for col_idx, cell_value in enumerate(row2_values, start=1):
            if cell_value:
                cell_str = str(cell_value).strip()
                if '.' in cell_str:
                    cell_str = cell_str.split('.')[0]
                if len(cell_str) == 8 and cell_str.isdigit():
                    question_codes_map[cell_str] = col_idx
        
        debug_print(f"Found {len(question_codes_map)} question codes in header")
        
        if not question_codes_map:
            debug_print("No valid question codes found in row 2")
            return False
        
        # Fill answers
        answers_filled = 0
        for submission_idx, record in enumerate(matching_records):
            current_row = 4 + submission_idx
            
            for question_code, col_idx in question_codes_map.items():
                question_id = f"Q_{question_code}"
                answer = get_answer_func(question_id, record)
                
                if answer and str(answer).strip():
                    usertype_sheet.range((current_row, col_idx)).value = force_numeric_rating(answer)
                    answers_filled += 1
        
        debug_print(f"UserType{usertype_num} complete: {answers_filled} answers filled across {len(matching_records)} submissions")
        return True
        
    except Exception as e:
        debug_print(f"Error filling UserType{usertype_num}: {e}")
        import traceback
        debug_print(traceback.format_exc())
        return False


def copy_and_fill_template(template_path, output_path, tool_name, tool_id, maturity_label, maturity_key, survey_data, innovator_only=False):
    """Copy template and fill with ALL survey data in ONE xlwings session"""
    debug_print(f"Copying template from: {template_path}")
    debug_print(f"Output will be: {output_path}")
    debug_print(f"Innovator only mode: {innovator_only}")
    
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Use xlwings to copy and fill (preserves everything)
    app = xw.App(visible=False)
    app.display_alerts = False
    app.screen_updating = False
    
    try:
        # Open template
        debug_print("Opening template with xlwings...")
        wb = app.books.open(str(template_path))
        
        # Disable background refresh to avoid locks during write
        try:
            for conn in wb.api.Connections:
                try:
                    if hasattr(conn, "OLEDBConnection"):
                        oledb = conn.OLEDBConnection
                        if hasattr(oledb, "BackgroundQuery"):
                            oledb.BackgroundQuery = False
                except Exception:
                    pass
            debug_print("Disabled background query refresh")
        except Exception as e:
            debug_print(f"Could not disable background queries: {e}")
        
        # Save as new file
        wb.api.SaveAs(str(output_path.absolute()))
        debug_print(f"Template copied to {output_path} with all connections preserved")
        
        # Now fill the data using xlwings
        target_sheet_names = ["Innovator Answers", "InnovatorAnswers", "Innovator_Answers"]
        ws = None
        
        for sheet_name in target_sheet_names:
            try:
                ws = wb.sheets[sheet_name]
                debug_print(f"Found target worksheet: {ws.name}")
                break
            except Exception:
                continue
        
        if ws is None:
            ws = wb.sheets[0]
            debug_print(f"Using first sheet: {ws.name}")
        
        debug_print(f"Filling template with:")
        debug_print(f"  Tool name: {tool_name}")
        debug_print(f"  Tool ID: {tool_id}")
        debug_print(f"  Maturity: {maturity_label}")

        # Fill header info
        if maturity_key == "advanced":
            ws.range("K16").value = f"Digital Tool Name: {tool_name}"
            ws.range("K17").value = f"Internal Innovation Code: {tool_id}"
            ws.range("K18").value = f"MDII Version: {maturity_label}"
            code_col = 9
            answer_col = 12
        else:
            ws.range("J16").value = f"Digital Tool Name: {tool_name}"
            ws.range("J17").value = f"Internal Innovation Code: {tool_id}"
            ws.range("J18").value = f"MDII Version: {maturity_label}"
            code_col = 8
            answer_col = 11
        
        debug_print("Header information set")
        
        # Fill survey answers
        debug_print("=== STARTING SURVEY ANSWER FILLING ===")
        start_row = 19
        max_row = 500
        
        has_data = any(len(records) > 0 for records in survey_data.values())
        
        # Get technology values
        all_records = []
        for records in survey_data.values():
            all_records.extend(records)
        
        tech_values = ""
        for record in all_records:
            tech_field = "group_used_technologies/Q_13230000"
            if tech_field in record and record[tech_field]:
                tech_values = str(record[tech_field]).strip()
                break
        tech_types_lower = [t.lower() for t in tech_values.split() if t]
        
        # Create mapping of tech question text to keys
        from collections import defaultdict
        tech_keys_by_text = defaultdict(list)
        for key, text in TECHNOLOGY_TYPES.items():
            tech_keys_by_text[text].append(key)
        
        # Read question codes in bulk
        code_range = ws.range((start_row, code_col), (max_row, code_col)).value
        question_range = ws.range((start_row, code_col + 2), (max_row, code_col + 2)).value
        
        answers_filled = 0
        
        for offset, (code_value, question_text) in enumerate(zip(code_range, question_range)):
            row_num = start_row + offset
            
            if code_value:
                code_str = str(code_value).strip()
                if '.' in code_str:
                    code_str = code_str.split('.')[0]
                    
                if len(code_str) == 8 and code_str.isdigit():
                    question_id = "Q_" + code_str
                    
                    if has_data and question_id != "Q_13230000":
                        answer = get_answer_for_question(question_id, survey_data)
                        ws.range((row_num, answer_col)).value = answer
                        answers_filled += 1
            else:
                question_text_full = str(question_text or "").strip()
                if question_text_full in tech_keys_by_text and has_data:
                    keys_for_this = tech_keys_by_text[question_text_full]
                    if set(tech_types_lower) & set(keys_for_this):
                        answer = "Yes"
                    else:
                        answer = "No"
                    ws.range((row_num, answer_col)).value = answer
                    answers_filled += 1
        
        debug_print(f"=== INNOVATOR ANSWERS FILLING COMPLETE: {answers_filled} answers filled ===")
        
        # NOW FILL USERTYPE SHEETS IN THE SAME SESSION (if not innovator_only)
        if not innovator_only:
            debug_print("=== FILLING USERTYPE SHEETS IN SAME SESSION ===")
            
            # Fill UserType II
            try:
                debug_print("Filling UserTypeII sheet...")
                fill_usertype_sheet_in_session(wb, tool_id, maturity_key, 2, USERTYPE2_FORMS)
            except Exception as e:
                debug_print(f"UserTypeII filling error: {e}")
                import traceback
                debug_print(traceback.format_exc())
            
            # Fill UserType III
            try:
                debug_print("Filling UserTypeIII sheet...")
                fill_usertype_sheet_in_session(wb, tool_id, maturity_key, 3, USERTYPE3_FORMS)
            except Exception as e:
                debug_print(f"UserTypeIII filling error: {e}")
                import traceback
                debug_print(traceback.format_exc())
            
            # Fill UserType IV
            try:
                debug_print("Filling UserTypeIV sheet...")
                fill_usertype_sheet_in_session(wb, tool_id, maturity_key, 4, USERTYPE4_FORMS)
            except Exception as e:
                debug_print(f"UserTypeIV filling error: {e}")
                import traceback
                debug_print(traceback.format_exc())
        else:
            debug_print("=== SKIPPING USERTYPE SHEETS (innovator-only mode) ===")
        
        # Save and close
        wb.save()
        debug_print("Workbook saved with all sheets filled and connections preserved")
        
        wb.close()
        
    except Exception as e:
        debug_print(f"Error: {e}")
        import traceback
        debug_print(f"Full traceback: {traceback.format_exc()}")
        raise Exception(f"Excel processing failed: {e}")
    finally:
        try:
            app.quit()
        except Exception:
            pass

def force_numeric_rating(value):
    """Convert Kobo answers like '0','1','2','3','4','5' to int."""
    if value is None:
        return None
    try:
        val_str = str(value).strip()
        if val_str in ["0", "1", "2", "3", "4", "5"]:
            return int(val_str)
        return value
    except:
        return value

def process_usertype2_answer(question_id, value):
    """Process the UserTypeII answer based on question type"""
    if value is None:
        return None
    
    value_str = str(value).strip()
    if not value_str:
        return None
    
    if value_str.lower() in ['n/a', 'na', 'not applicable']:
        return "Not Applicable"
    
    if '_' in value_str:
        items = value_str.replace('_', ' ').split()
        return ", ".join(items)
    
    return value_str

def process_usertype3_answer(question_id, value):
    """Process the UserTypeIII answer based on question type"""
    if value is None:
        return None
    
    value_str = str(value).strip()
    if not value_str:
        return None
    
    if value_str.lower() in ['n/a', 'na', 'not applicable']:
        return "Not Applicable"
    
    if '_' in value_str:
        items = value_str.replace('_', ' ').split()
        return ", ".join(items)
    
    return value_str

def process_usertype4_answer(question_id, value):
    """Process the UserTypeIV answer based on question type"""
    if value is None:
        return None
    
    value_str = str(value).strip()
    if not value_str:
        return None
    
    if value_str.lower() in ['n/a', 'na', 'not applicable']:
        return "Not Applicable"
    
    if '_' in value_str:
        items = value_str.replace('_', ' ').split()
        return ", ".join(items)
    
    return value_str

def find_usertype2_answer_in_record(question_id, record):
    """Find answer for UserTypeII question ID in a single record"""
    possible_paths = [
        question_id,
        f"group_toolid/{question_id}",
        f"group_intro/{question_id}",
        f"group_individualinfo/{question_id}",
        f"group_beneficialimpact/{question_id}",
        f"group_risks/{question_id}",
        f"group_accessibility/{question_id}",
        f"group_supportiveecosystem/{question_id}",
        f"group_ethicalinnovation/{question_id}",
        f"group_cocreationgovernance/{question_id}",
        f"group_intro_001/{question_id}",
        f"group_usage/{question_id}",
    ]
    
    for path in possible_paths:
        if path in record:
            value = record[path]
            if value is not None and str(value).strip():
                processed_answer = process_usertype2_answer(question_id, value)
                if processed_answer:
                    return processed_answer
    
    return None

def find_usertype3_answer_in_record(question_id, record):
    """Find answer for UserTypeIII question ID in a single record"""
    possible_paths = [
        question_id,
        f"group_toolid/{question_id}",
        f"group_intro/{question_id}",
        f"group_individualinfo/{question_id}",
        f"group_dra_access/{question_id}",
        f"group_dra_usage/{question_id}",
        f"group_dra_skills/{question_id}",
        f"group_dra_environment/{question_id}",
        f"group_beneficialimpact/{question_id}",
        f"group_risks/{question_id}",
        f"group_accessibility/{question_id}",
        f"group_supportiveecosystem/{question_id}",
        f"group_ethicalinnovation/{question_id}",
        f"group_cocreationgovernance/{question_id}",
        f"group_intro_001/{question_id}",
        f"group_usage/{question_id}",
    ]
    
    for path in possible_paths:
        if path in record:
            value = record[path]
            if value is not None and str(value).strip():
                processed_answer = process_usertype3_answer(question_id, value)
                if processed_answer:
                    return processed_answer
    
    return None

def find_usertype4_answer_in_record(question_id, record):
    """Find answer for UserTypeIV question ID in a single record"""
    possible_paths = [
        question_id,
        f"group_toolid/{question_id}",
        f"group_intro/{question_id}",
        f"group_beneficialimpact/{question_id}",
        f"group_risks/{question_id}",
        f"group_accessibility/{question_id}",
        f"group_usage/{question_id}",
        f"group_supportiveecosystem/{question_id}",
        f"group_ethicalinnovation/{question_id}",
        f"group_cocreationgovernance/{question_id}",
        f"group_individualinfo/{question_id}",
        f"group_dra_access/{question_id}",
        f"group_dra_usage/{question_id}",
        f"group_dra_skills/{question_id}",
        f"group_dra_environment/{question_id}",
    ]
    
    for path in possible_paths:
        if path in record:
            value = record[path]
            if value is not None and str(value).strip():
                processed_answer = process_usertype4_answer(question_id, value)
                if processed_answer:
                    return processed_answer
    
    return None

def get_usertype2_answer_from_record(question_id, record):
    """Get answer for a UserTypeII question from a single specific record"""
    answer = find_usertype2_answer_in_record(question_id, record)
    if answer:
        return answer
    return ""

def get_usertype3_answer_from_record(question_id, record):
    """Get answer for a UserTypeIII question from a single specific record"""
    answer = find_usertype3_answer_in_record(question_id, record)
    if answer:
        return answer
    return ""

def get_usertype4_answer_from_record(question_id, record):
    """Get answer for a UserTypeIV question from a single specific record"""
    answer = find_usertype4_answer_in_record(question_id, record)
    if answer:
        return answer
    return ""


def main():
    if len(sys.argv) < 2:
        debug_print("Usage: python main.py <TOOL_ID> [--pdf-only|--innovator-only]")
        print("Error: Missing tool ID argument")
        sys.exit(1)

    tool_id = sys.argv[1]
    pdf_only = "--pdf-only" in sys.argv
    innovator_only = "--innovator-only" in sys.argv
    
    debug_print(f"Processing Tool ID: {tool_id}")
    debug_print(f"PDF only mode: {pdf_only}")
    debug_print(f"Innovator only mode: {innovator_only}")

    safe_tool_id = tool_id.replace("/", "_").replace("\\", "_").replace(":", "_")

    if pdf_only:
        debug_print("=== RUNNING IN PDF-ONLY MODE ===")
        excel_path = OUTPUT_DIR / safe_tool_id / f"{safe_tool_id}_MDII_Toolkit.xlsm"

        if not excel_path.exists():
            print(f"Error: Excel file not found at {excel_path}")
            sys.exit(1)
        
        # Detect maturity level from Excel
        wb = openpyxl.load_workbook(excel_path, data_only=True)
        maturity_key = "advanced"
        
        for sheet in wb.worksheets:
            for row_idx in range(1, 20):
                for col_idx in range(1, 15):
                    cell_value = sheet.cell(row_idx, col_idx).value
                    if cell_value and "early stage" in str(cell_value).lower():
                        maturity_key = "early"
                        break
        
        wb.close()
        debug_print(f"Detected maturity level: {maturity_key}")
        
        success = generate_pdfs_from_excel(safe_tool_id, excel_path, maturity_key)
        if success:
            print(f"Domain-specific PDFs generated successfully for tool ID: {tool_id}")
        else:
            print("Error: PDF generation failed")
            sys.exit(1)
        return

    debug_print("=== RUNNING IN PROCESSING MODE ===")
    
    # Check templates exist
    missing_templates = [str(path) for key, path in TEMPLATES.items() if not path.exists()]
    if missing_templates:
        print(f"Error: Templates not found: {missing_templates}")
        sys.exit(1)

    # ADD TEMPLATE VERIFICATION HERE:
    debug_print("=== VERIFYING TEMPLATE INTEGRITY ===")
    for key, template_path in TEMPLATES.items():
        debug_print(f"\nChecking {key} template:")
        if not verify_template_integrity(template_path):
            print(f"Error: Template {key} is corrupted or invalid")
            sys.exit(1)
    debug_print("=== ALL TEMPLATES VERIFIED ===\n")

    # Fetch tool record
    record = find_tool_record(tool_id)
    if not record:
        print(f"Error: Tool ID '{tool_id}' not found in main form data.")
        sys.exit(1)

    # Fetch survey data
    survey_data = find_survey_records(tool_id)

    # Determine maturity level
    maturity_value = str(record.get(MATURITY_FIELD, "")).strip()
    if maturity_value == "early_stage":
        maturity_key, maturity_label = "early", "Early Stage"
    else:
        maturity_key, maturity_label = "advanced", "Advanced Stage"

    template_path = TEMPLATES[maturity_key]
    tool_name = record.get(TOOL_NAME_FIELD, "Unknown Tool")
    tool_folder = OUTPUT_DIR / safe_tool_id
    tool_folder.mkdir(parents=True, exist_ok=True)
    output_path = tool_folder / f"{safe_tool_id}_MDII_Toolkit.xlsm"

    # Create and fill Excel file WITH ALL SHEETS IN ONE SESSION
    copy_and_fill_template(template_path, output_path, tool_name, tool_id, maturity_label, maturity_key, survey_data, innovator_only)
    print(f"Excel file created: {str(output_path)}")
    
    # Generate PDFs
    try:
        success = generate_pdfs_from_excel(safe_tool_id, output_path, maturity_key)
        if success:
            print("Domain-specific PDFs generated successfully!")
        else:
            print("Warning: PDF generation failed")
    except Exception as e:
        debug_print(f"PDF generation failed: {e}")
        print(f"Warning: PDF generation failed: {e}")

if __name__ == "__main__":
    main()
