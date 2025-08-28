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

# Second tool ID field for survey forms
SURVEY_TOOL_ID_FIELD = "Q_13110000"

# Get the directory where this script is located
SCRIPT_DIR = Path(__file__).parent.absolute()
TEMPLATES = {
    "early": SCRIPT_DIR / "templates" / "MDII_OfflineToolKIT_EAV.xlsm",
    "advanced": SCRIPT_DIR / "templates" / "MDII_OfflineToolKIT_RV.xlsm",
}

OUTPUT_DIR = Path(os.path.expanduser("~/Downloads"))

# PDF Generation Config - Updated for domain-based analysis
PDF_CONFIG = {
    "early": {
        "DOMAIN_START_ROW": 16,
        "DOMAIN_COLUMNS": [1, 2, 3, 4, 5, 6],  # Columns A-F (1-6)
        "FLAG_VALUE": "X"
    },
    "advanced": {
        "DOMAIN_START_ROW": 16,
        "DOMAIN_COLUMNS": [1, 2, 3, 4, 5, 6, 7],  # Columns A-G (1-7)  
        "FLAG_VALUE": "X"
    }
}
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

# ==== KOBO DATA PROCESSING FUNCTIONS ====

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
            
            matching_records = []
            for record in data:
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
    
    all_records = []
    for survey_name, records in survey_data.items():
        for record in records:
            all_records.append(record)
    
    if not all_records:
        debug_print(f"No survey records available for question {question_id}")
        return "The Innovator Didn't Provide an answer for this Question"
    
    for record in all_records:
        answer = find_answer_in_record(question_id, record)
        if answer:
            debug_print(f"Found answer for {question_id}: {answer}")
            return answer
    
    question_code = question_id.replace("Q_", "")
    if question_code in DEPENDENT_CODES:
        return "-- --"
    
    if question_code in EVIDENCE_UPLOAD_CODES:
        return "The Innovator Didn't Upload Any Evidence for this Question"
    
    return "The Innovator Didn't Provide an answer for this Question"

def find_answer_in_record(question_id, record):
    """Find answer for question ID in a single record"""
    if question_id == "Q_13230000":
        return handle_technology_question(record)
    
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
    
    tech_types = tech_values.split()
    responses = []
    
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
    
    if value_str.lower() in ['n/a', 'na', 'not applicable']:
        return "The Innovator answered that this Question was not Applicable to their Context"
    
    question_code = question_id.replace("Q_", "")
    
    # if question_code in YES_NO_CODES:
    #     if value_str.lower() in ['yes', 'y', '1', 'true']:
    #         return "Yes"
    #     elif value_str.lower() in ['no', 'n', '0', 'false']:
    #         return "No"
    
    if question_code in MULTI_SELECT_CODES:
        items = value_str.replace('_', ' ').split()
        return ", ".join(items)
    
    return value_str

def copy_and_fill_template(template_path, output_path, tool_name, tool_id, maturity_label, maturity_key, survey_data):
    debug_print(f"Copying template from: {template_path}")
    debug_print(f"Output will be: {output_path}")
    
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
            try:
                cell = worksheet[cell_ref]
                if hasattr(cell, 'coordinate') and cell.coordinate in worksheet.merged_cells:
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
            debug_print("=== STARTING SURVEY ANSWER FILLING ===")
            debug_print(f"Maturity key: {maturity_key}")
            
            if maturity_key == "advanced":
                code_col = 9
                question_col = 11
                answer_col = 12
                debug_print("Using ADVANCED template column mapping:")
            else:
                code_col = 8
                question_col = 10
                answer_col = 11
                debug_print("Using EARLY template column mapping:")
            
            debug_print(f"  Code column: {chr(64 + code_col)} (column {code_col})")
            debug_print(f"  Question text column: {chr(64 + question_col)} (column {question_col})")
            debug_print(f"  Answer column: {chr(64 + answer_col)} (column {answer_col})")
            
            start_row = 19
            max_row = worksheet.max_row or 500
            debug_print(f"  Processing rows {start_row} to {max_row}")
            
            has_data = any(len(records) > 0 for records in survey_data.values())
            debug_print(f"  Has survey data: {has_data}")
            if has_data:
                total_records = sum(len(records) for records in survey_data.values())
                debug_print(f"  Total survey records: {total_records}")
            
            debug_print("=== EXAMINING SHEET STRUCTURE ===")
            for row_num in range(start_row, min(start_row + 10, max_row + 1)):
                code_value = worksheet.cell(row_num, code_col).value
                question_text = worksheet.cell(row_num, question_col).value
                current_answer = worksheet.cell(row_num, answer_col).value
                debug_print(f"Row {row_num}: Code='{code_value}' | Question='{str(question_text)[:50] if question_text else None}...' | Current Answer='{current_answer}'")
            
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
            debug_print(f"Technology values found: '{tech_values}'")
            debug_print(f"Tech types (lowercase): {tech_types_lower}")
            
            tech_keys_by_text = defaultdict(list)
            for key, text in TECHNOLOGY_TYPES.items():
                tech_keys_by_text[text].append(key)
            
            debug_print("=== PROCESSING ANSWERS ===")
            debug_print("Clearing existing template answers...")
            for row_num in range(start_row, max_row + 1):
                answer_cell_ref = f"{chr(64 + answer_col)}{row_num}"
                safe_set_cell_value(worksheet, answer_cell_ref, "")
            
            row = start_row
            answers_filled = 0
            questions_processed = 0
            
            while row <= max_row:
                code_value = worksheet.cell(row, code_col).value
                question_text_full = str(worksheet.cell(row, question_col).value or "").strip()
                
                if code_value is None and not question_text_full:
                    row += 1
                    continue
                
                questions_processed += 1
                
                if code_value:
                    code_str = str(code_value).strip()
                    if len(code_str) == 8 and code_str.isdigit():
                        question_id = "Q_" + code_str
                        debug_print(f"Processing question {question_id} at row {row}")
                        
                        if has_data:
                            if question_id == "Q_13230000":
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


def fill_usertype2_sheet(excel_path, tool_id, maturity_key):
    debug_print(f"=== FILLING USERTYPE2 SHEET ===")
    debug_print(f"Excel path: {excel_path}")
    debug_print(f"Tool ID: {tool_id}")
    debug_print(f"Maturity key: {maturity_key}")
    
    form_id = USERTYPE2_FORMS.get(maturity_key)
    if not form_id:
        debug_print(f"No UserTypeII form ID found for maturity level: {maturity_key}")
        return False
    
    debug_print(f"Using form ID: {form_id}")
    
    try:
        usertype2_data = fetch_kobo_data(form_id)
        debug_print(f"Fetched {len(usertype2_data)} records from UserTypeII form")
        
        matching_records = []
        possible_fields = [
            "group_toolid/Q_13110000",
            "group_requester/Q_13110000",
            "Q_13110000",
            "group_requester/Q_1311000"
        ]
        
        for record in usertype2_data:
            record_tool_id = ""
            found_in_field = None
            
            for field in possible_fields:
                if field in record and record[field]:
                    record_tool_id = str(record[field]).strip()
                    found_in_field = field
                    break
            
            debug_print(f"UserTypeII record ID: '{record_tool_id}' (from field: {found_in_field})")
            if record_tool_id.lower().strip() == str(tool_id).lower().strip():
                matching_records.append(record)
        
        debug_print(f"Found {len(matching_records)} matching UserTypeII records")
        
        if not matching_records:
            debug_print("No matching UserTypeII records found")
            return False
        
        wb = openpyxl.load_workbook(excel_path, keep_vba=True)
        
        usertype2_sheet = None
        possible_sheet_names = ["UserTypeII_Answers", "UserType2_Answers", "UserType_II_Answers"]
        
        for sheet_name in possible_sheet_names:
            if sheet_name in wb.sheetnames:
                usertype2_sheet = wb[sheet_name]
                debug_print(f"Found UserTypeII sheet: {sheet_name}")
                break
        
        if not usertype2_sheet:
            debug_print("UserTypeII_Answers sheet not found")
            debug_print(f"Available sheets: {wb.sheetnames}")
            wb.close()
            return False
        
        # UserType2 has different column layout than main survey
        # The question codes are in a horizontal layout in row 2
        # Answers go in row 4 onwards
        
        debug_print("=== ANALYZING USERTYPE2 SHEET STRUCTURE ===")
        
        # Find question codes in row 2
        question_codes_map = {}  # {question_code: column_index}
        
        # For UserType2, scan across columns in row 2 to find question codes
        max_col = usertype2_sheet.max_column or 200
        debug_print(f"Scanning columns 1 to {max_col} in row 2 for question codes")
        
        for col_idx in range(1, max_col + 1):
            cell_value = usertype2_sheet.cell(2, col_idx).value  # Row 2
            if cell_value:
                cell_str = str(cell_value).strip()
                debug_print(f"Row 2, Column {col_idx} ({chr(64 + col_idx)}): '{cell_str}'")
                
                # Check for question codes
                if maturity_key == "early":
                    # Early stage: codes like E21423000, E21422000, etc.
                    if len(cell_str) == 8 and cell_str.isdigit():
                        question_code = cell_str
                        question_codes_map[question_code] = col_idx
                        debug_print(f"Found early stage question code: {cell_str} -> Q_{question_code} at column {col_idx}")
                
                elif maturity_key == "advanced":
                    # Advanced stage: codes like 21424000, 21423000, etc.
                    if len(cell_str) == 8 and cell_str.isdigit():
                        question_code = cell_str
                        question_codes_map[question_code] = col_idx
                        debug_print(f"Found advanced stage question code: {cell_str} -> Q_{question_code} at column {col_idx}")
        
        debug_print(f"Total question codes found: {len(question_codes_map)}")
        debug_print(f"Question codes mapping: {question_codes_map}")
        
        if not question_codes_map:
            debug_print("No question codes found in UserType2 sheet row 2")
            wb.close()
            return False
        
        # Clear existing answers in row 4 onwards for all question columns
        debug_print("Clearing existing UserType2 answers...")
        for question_code, col_idx in question_codes_map.items():
            for row_idx in range(4, 20):  # Clear multiple rows
                usertype2_sheet.cell(row_idx, col_idx).value = ""
        
        answers_filled = 0
        
        # Process each question code found in the sheet
        for question_code, col_idx in question_codes_map.items():
            question_id = f"Q_{question_code}"
            debug_print(f"Processing UserTypeII question {question_id} at column {col_idx}")
            
            # Get answer from UserType2 survey data
            answer = get_usertype2_answer(question_id, matching_records)
            
            if answer and answer.strip():
                # Put answer in row 4
                answer_cell = usertype2_sheet.cell(4, col_idx)
                answer_cell.value = answer
                debug_print(f"Set UserTypeII answer at column {col_idx} (row 4): {answer}")
                answers_filled += 1
            else:
                debug_print(f"No answer found for {question_id}")
        
        debug_print(f"UserTypeII filling complete - {answers_filled} answers filled")
        
        wb.save(excel_path)
        wb.close()
        
        debug_print("UserTypeII sheet updated successfully")
        return True
        
    except Exception as e:
        debug_print(f"Error filling UserTypeII sheet: {e}")
        import traceback
        debug_print(f"Full traceback: {traceback.format_exc()}")
        return False

def fill_usertype3_sheet(excel_path, tool_id, maturity_key):
    debug_print(f"=== FILLING USERTYPE3 SHEET ===")
    debug_print(f"Excel path: {excel_path}")
    debug_print(f"Tool ID: {tool_id}")
    debug_print(f"Maturity key: {maturity_key}")
    
    form_id = USERTYPE3_FORMS.get(maturity_key)
    if not form_id:
        debug_print(f"No UserTypeIII form ID found for maturity level: {maturity_key}")
        return False
    
    debug_print(f"Using form ID: {form_id}")
    
    try:
        usertype3_data = fetch_kobo_data(form_id)
        debug_print(f"Fetched {len(usertype3_data)} records from UserTypeIII form")
        
        matching_records = []
        possible_fields = [
            "group_toolid/Q_13110000",
            "group_requester/Q_13110000",
            "Q_13110000",
            "group_requester/Q_1311000"
        ]
        
        for record in usertype3_data:
            record_tool_id = ""
            found_in_field = None
            
            for field in possible_fields:
                if field in record and record[field]:
                    record_tool_id = str(record[field]).strip()
                    found_in_field = field
                    break
            
            debug_print(f"UserTypeIII record ID: '{record_tool_id}' (from field: {found_in_field})")
            if record_tool_id.lower().strip() == str(tool_id).lower().strip():
                matching_records.append(record)
        
        debug_print(f"Found {len(matching_records)} matching UserTypeIII records")
        
        if not matching_records:
            debug_print("No matching UserTypeIII records found")
            return False
        
        wb = openpyxl.load_workbook(excel_path, keep_vba=True)
        
        usertype3_sheet = None
        possible_sheet_names = ["UserTypeIII_Answers", "UserType3_Answers", "UserType_III_Answers"]
        
        for sheet_name in possible_sheet_names:
            if sheet_name in wb.sheetnames:
                usertype3_sheet = wb[sheet_name]
                debug_print(f"Found UserTypeIII sheet: {sheet_name}")
                break
        
        if not usertype3_sheet:
            debug_print("UserTypeIII_Answers sheet not found")
            debug_print(f"Available sheets: {wb.sheetnames}")
            wb.close()
            return False
        
        debug_print("=== ANALYZING USERTYPE3 SHEET STRUCTURE ===")
        
        # Find question codes in row 2
        question_codes_map = {}  # {question_code: column_index}
        
        # For UserType3, scan across columns in row 2 to find question codes
        max_col = usertype3_sheet.max_column or 200
        debug_print(f"Scanning columns 1 to {max_col} in row 2 for question codes")
        
        for col_idx in range(1, max_col + 1):
            cell_value = usertype3_sheet.cell(2, col_idx).value  # Row 2
            if cell_value:
                cell_str = str(cell_value).strip()
                debug_print(f"Row 2, Column {col_idx} ({chr(64 + col_idx)}): '{cell_str}'")
                
                # Check for question codes
                if maturity_key == "early":
                    # Early stage: codes like E31431000, E31411000, etc.
                    if len(cell_str) == 8 and cell_str.isdigit():
                        question_code = cell_str
                        question_codes_map[question_code] = col_idx
                        debug_print(f"Found early stage question code: {cell_str} -> Q_{question_code} at column {col_idx}")
                
                elif maturity_key == "advanced":
                    # Advanced stage: codes like 31421000, 31422000, etc.
                    if len(cell_str) == 8 and cell_str.isdigit():
                        question_code = cell_str
                        question_codes_map[question_code] = col_idx
                        debug_print(f"Found advanced stage question code: {cell_str} -> Q_{question_code} at column {col_idx}")
        
        debug_print(f"Total question codes found: {len(question_codes_map)}")
        debug_print(f"Question codes mapping: {question_codes_map}")
        
        if not question_codes_map:
            debug_print("No question codes found in UserType3 sheet row 2")
            wb.close()
            return False
        
        # Clear existing answers in row 4 onwards for all question columns
        debug_print("Clearing existing UserType3 answers...")
        for question_code, col_idx in question_codes_map.items():
            for row_idx in range(4, 20):  # Clear multiple rows
                usertype3_sheet.cell(row_idx, col_idx).value = ""
        
        answers_filled = 0
        
        # Process each question code found in the sheet
        for question_code, col_idx in question_codes_map.items():
            question_id = f"Q_{question_code}"
            debug_print(f"Processing UserTypeIII question {question_id} at column {col_idx}")
            
            # Get answer from UserType3 survey data
            answer = get_usertype3_answer(question_id, matching_records)
            
            if answer and answer.strip():
                # Put answer in row 4
                answer_cell = usertype3_sheet.cell(4, col_idx)
                answer_cell.value = answer
                debug_print(f"Set UserTypeIII answer at column {col_idx} (row 4): {answer}")
                answers_filled += 1
            else:
                debug_print(f"No answer found for {question_id}")
        
        debug_print(f"UserTypeIII filling complete - {answers_filled} answers filled")
        
        wb.save(excel_path)
        wb.close()
        
        debug_print("UserTypeIII sheet updated successfully")
        return True
        
    except Exception as e:
        debug_print(f"Error filling UserTypeIII sheet: {e}")
        import traceback
        debug_print(f"Full traceback: {traceback.format_exc()}")
        return False

def fill_usertype4_sheet(excel_path, tool_id, maturity_key):
    debug_print(f"=== FILLING USERTYPE4 SHEET ===")
    debug_print(f"Excel path: {excel_path}")
    debug_print(f"Tool ID: {tool_id}")
    debug_print(f"Maturity key: {maturity_key}")
    
    form_id = USERTYPE4_FORMS.get(maturity_key)
    if not form_id:
        debug_print(f"No UserTypeIV form ID found for maturity level: {maturity_key}")
        return False
    
    debug_print(f"Using form ID: {form_id}")
    
    try:
        usertype4_data = fetch_kobo_data(form_id)
        debug_print(f"Fetched {len(usertype4_data)} records from UserTypeIV form")
        
        matching_records = []
        possible_fields = [
            "group_toolid/Q_13110000",
            "group_requester/Q_13110000", 
            "Q_13110000",
            "group_requester/Q_1311000",
            "group_individualinfo/Q_13110000"  # Special field for UserType4
        ]
        
        for record in usertype4_data:
            record_tool_id = ""
            found_in_field = None
            
            for field in possible_fields:
                if field in record and record[field]:
                    record_tool_id = str(record[field]).strip()
                    found_in_field = field
                    break
            
            debug_print(f"UserTypeIV record ID: '{record_tool_id}' (from field: {found_in_field})")
            if record_tool_id.lower().strip() == str(tool_id).lower().strip():
                matching_records.append(record)
        
        debug_print(f"Found {len(matching_records)} matching UserTypeIV records")
        
        if not matching_records:
            debug_print("No matching UserTypeIV records found")
            return False
        
        wb = openpyxl.load_workbook(excel_path, keep_vba=True)
        
        usertype4_sheet = None
        possible_sheet_names = ["UserTypeIV_Answers", "UserType4_Answers", "UserType_IV_Answers"]
        
        for sheet_name in possible_sheet_names:
            if sheet_name in wb.sheetnames:
                usertype4_sheet = wb[sheet_name]
                debug_print(f"Found UserTypeIV sheet: {sheet_name}")
                break
        
        if not usertype4_sheet:
            debug_print("UserTypeIV_Answers sheet not found")
            debug_print(f"Available sheets: {wb.sheetnames}")
            wb.close()
            return False
        
        debug_print("=== ANALYZING USERTYPE4 SHEET STRUCTURE ===")
        
        # Find question codes in row 2
        question_codes_map = {}  # {question_code: column_index}
        
        # For UserType4, scan across columns in row 2 to find question codes
        max_col = usertype4_sheet.max_column or 200
        debug_print(f"Scanning columns 1 to {max_col} in row 2 for question codes")
        
        for col_idx in range(1, max_col + 1):
            cell_value = usertype4_sheet.cell(2, col_idx).value  # Row 2
            if cell_value:
                cell_str = str(cell_value).strip()
                debug_print(f"Row 2, Column {col_idx} ({chr(64 + col_idx)}): '{cell_str}'")
                
                # Check for question codes
                if maturity_key == "early":
                    # Early stage: codes like E41411000, E41412000, etc.
                    if len(cell_str) == 8 and cell_str.isdigit():
                        question_code = cell_str
                        question_codes_map[question_code] = col_idx
                        debug_print(f"Found early stage question code: {cell_str} -> Q_{question_code} at column {col_idx}")
                
                elif maturity_key == "advanced":
                    # Advanced stage: codes like 41411000, 41412000, etc.
                    if len(cell_str) == 8 and cell_str.isdigit():
                        question_code = cell_str
                        question_codes_map[question_code] = col_idx
                        debug_print(f"Found advanced stage question code: {cell_str} -> Q_{question_code} at column {col_idx}")
        
        debug_print(f"Total question codes found: {len(question_codes_map)}")
        debug_print(f"Question codes mapping: {question_codes_map}")
        
        if not question_codes_map:
            debug_print("No question codes found in UserType4 sheet row 2")
            wb.close()
            return False
        
        # Clear existing answers in row 4 onwards for all question columns
        debug_print("Clearing existing UserType4 answers...")
        for question_code, col_idx in question_codes_map.items():
            for row_idx in range(4, 20):  # Clear multiple rows
                usertype4_sheet.cell(row_idx, col_idx).value = ""
        
        answers_filled = 0
        
        # Process each question code found in the sheet
        for question_code, col_idx in question_codes_map.items():
            question_id = f"Q_{question_code}"
            debug_print(f"Processing UserTypeIV question {question_id} at column {col_idx}")
            
            # Get answer from UserType4 survey data
            answer = get_usertype4_answer(question_id, matching_records)
            
            if answer and answer.strip():
                # Put answer in row 4
                answer_cell = usertype4_sheet.cell(4, col_idx)
                answer_cell.value = answer
                debug_print(f"Set UserTypeIV answer at column {col_idx} (row 4): {answer}")
                answers_filled += 1
            else:
                debug_print(f"No answer found for {question_id}")
        
        debug_print(f"UserTypeIV filling complete - {answers_filled} answers filled")
        
        wb.save(excel_path)
        wb.close()
        
        debug_print("UserTypeIV sheet updated successfully")
        return True
        
    except Exception as e:
        debug_print(f"Error filling UserTypeIV sheet: {e}")
        import traceback
        debug_print(f"Full traceback: {traceback.format_exc()}")
        return False
    
def get_usertype2_answer(question_id, usertype2_records):
    """Get answer for a UserTypeII question from the records"""
    debug_print(f"Looking for UserTypeII answer to question: {question_id}")
    
    if not usertype2_records:
        debug_print(f"No UserTypeII records available for question {question_id}")
        return ""
    
    for record in usertype2_records:
        answer = find_usertype2_answer_in_record(question_id, record)
        if answer:
            debug_print(f"Found UserTypeII answer for {question_id}: {answer}")
            return answer
    
    debug_print(f"No answer found for {question_id}")
    return ""

def get_usertype3_answer(question_id, usertype3_records):
    """Get answer for a UserTypeIII question from the records"""
    debug_print(f"Looking for UserTypeIII answer to question: {question_id}")
    
    if not usertype3_records:
        debug_print(f"No UserTypeIII records available for question {question_id}")
        return ""
    
    for record in usertype3_records:
        answer = find_usertype3_answer_in_record(question_id, record)
        if answer:
            debug_print(f"Found UserTypeIII answer for {question_id}: {answer}")
            return answer
    
    debug_print(f"No answer found for {question_id}")
    return ""

def get_usertype4_answer(question_id, usertype4_records):
    """Get answer for a UserTypeIV question from the records"""
    debug_print(f"Looking for UserTypeIV answer to question: {question_id}")
    
    if not usertype4_records:
        debug_print(f"No UserTypeIV records available for question {question_id}")
        return ""
    
    for record in usertype4_records:
        answer = find_usertype4_answer_in_record(question_id, record)
        if answer:
            debug_print(f"Found UserTypeIV answer for {question_id}: {answer}")
            return answer
    
    debug_print(f"No answer found for {question_id}")
    return ""

def find_usertype2_answer_in_record(question_id, record):
    """Find answer for UserTypeII question ID in a single record"""
    debug_print(f"Searching for {question_id} in UserTypeII record...")
    
    # Based on the sample data, UserType2 questions are in specific groups
    possible_paths = [
        question_id,
        f"group_beneficialimpact/{question_id}",
        f"group_risks/{question_id}",
        f"group_accessibility/{question_id}",
        f"group_supportiveecosystem/{question_id}",
        f"group_ethicalinnovation/{question_id}",
        f"group_cocreationgovernance/{question_id}",
        f"group_usertype2/{question_id}",
        f"group_evaluation/{question_id}",
        f"group_requester/{question_id}",
        f"group_toolid/{question_id}"
    ]
    
    for path in possible_paths:
        if path in record:
            value = record[path]
            if value is not None and str(value).strip():
                processed_answer = process_usertype2_answer(question_id, value)
                if processed_answer:
                    debug_print(f"Found UserTypeII answer for {question_id} at path {path}: {processed_answer}")
                    return processed_answer
    
    debug_print(f"No answer found for {question_id} in any path")
    return None

def find_usertype3_answer_in_record(question_id, record):
    """Find answer for UserTypeIII question ID in a single record"""
    debug_print(f"Searching for {question_id} in UserTypeIII record...")
    
    # Based on the sample data, UserType3 questions are in specific groups
    possible_paths = [
        question_id,
        f"group_beneficialimpact/{question_id}",
        f"group_risks/{question_id}",
        f"group_accessibility/{question_id}",
        f"group_supportiveecosystem/{question_id}",
        f"group_ethicalinnovation/{question_id}",
        f"group_cocreationgovernance/{question_id}",
        f"group_usertype3/{question_id}",
        f"group_evaluation/{question_id}",
        f"group_requester/{question_id}",
        f"group_toolid/{question_id}",
        f"group_individualinfo/{question_id}",
        f"group_dra_access/{question_id}",
        f"group_dra_usage/{question_id}",
        f"group_dra_skills/{question_id}",
        f"group_dra_environment/{question_id}"
    ]
    
    for path in possible_paths:
        if path in record:
            value = record[path]
            if value is not None and str(value).strip():
                processed_answer = process_usertype3_answer(question_id, value)
                if processed_answer:
                    debug_print(f"Found UserTypeIII answer for {question_id} at path {path}: {processed_answer}")
                    return processed_answer
    
    debug_print(f"No answer found for {question_id} in any path")
    return None

def find_usertype4_answer_in_record(question_id, record):
    """Find answer for UserTypeIV question ID in a single record"""
    debug_print(f"Searching for {question_id} in UserTypeIV record...")
    
    # Based on the sample data, UserType4 questions are in specific groups
    possible_paths = [
        question_id,
        f"group_beneficialimpact/{question_id}",
        f"group_risks/{question_id}",
        f"group_accessibility/{question_id}",
        f"group_supportiveecosystem/{question_id}",
        f"group_ethicalinnovation/{question_id}",
        f"group_cocreationgovernance/{question_id}",
        f"group_usertype4/{question_id}",
        f"group_evaluation/{question_id}",
        f"group_requester/{question_id}",
        f"group_toolid/{question_id}",
        f"group_individualinfo/{question_id}",
        f"group_dra_access/{question_id}",
        f"group_dra_usage/{question_id}",
        f"group_dra_skills/{question_id}",
        f"group_dra_environment/{question_id}"
    ]
    
    for path in possible_paths:
        if path in record:
            value = record[path]
            if value is not None and str(value).strip():
                processed_answer = process_usertype4_answer(question_id, value)
                if processed_answer:
                    debug_print(f"Found UserTypeIV answer for {question_id} at path {path}: {processed_answer}")
                    return processed_answer
    
    debug_print(f"No answer found for {question_id} in any path")
    return None

def process_usertype2_answer(question_id, value):
    """Process the UserTypeII answer - these are typically numeric ratings"""
    if value is None:
        return None
    
    value_str = str(value).strip()
    if not value_str:
        return None
    
    # UserType2 answers are typically numeric ratings (0-5)
    # Return them as-is since they're already in the correct format
    debug_print(f"Processing UserType2 answer: '{value_str}'")
    return value_str

def process_usertype2_answer(question_id, value):
    """Process the UserTypeII answer based on question type"""
    if value is None:
        return None
    
    value_str = str(value).strip()
    if not value_str:
        return None
    
    if value_str.lower() in ['n/a', 'na', 'not applicable']:
        return "The Innovator answered that this Question was not Applicable to their Context"
    
    # For UserTypeII, we can use similar processing logic as the main survey
    question_code = question_id.replace("Q_", "")
    
    # Check if it's a yes/no question (you may need to adjust these based on UserTypeII question types)
    # if value_str.lower() in ['yes', 'y', '1', 'true']:
    #     return "Yes"
    # elif value_str.lower() in ['no', 'n', '0', 'false']:
    #     return "No"
    
    # For multi-select, clean up the formatting
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
        return "The Innovator answered that this Question was not Applicable to their Context"
    
    # For UserTypeIII, we can use similar processing logic as the main survey
    question_code = question_id.replace("Q_", "")
    
    # Check if it's a yes/no question
    # if value_str.lower() in ['yes', 'y', '1', 'true']:
    #     return "Yes"
    # elif value_str.lower() in ['no', 'n', '0', 'false']:
    #     return "No"
    
    # For multi-select, clean up the formatting
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
        return "The Innovator answered that this Question was not Applicable to their Context"
    
    # For UserTypeIV, we can use similar processing logic as the main survey
    question_code = question_id.replace("Q_", "")
    
    # Check if it's a yes/no question
    # if value_str.lower() in ['yes', 'y', '1', 'true']:
    #     return "Yes"
    # elif value_str.lower() in ['no', 'n', '0', 'false']:
    #     return "No"
    
    # For multi-select, clean up the formatting
    if '_' in value_str:
        items = value_str.replace('_', ' ').split()
        return ", ".join(items)
    
    return value_str

# ==== IMPROVED PDF GENERATION FUNCTION ====

def clean_html_text(html_text):
    """Clean HTML tags from text and preserve formatting"""
    if not html_text:
        return ""
    
    text = str(html_text)
    
    # Remove HTML tags but preserve structure
    text = re.sub(r'<[^>]+>', ' ', text)
    # Clean up multiple spaces
    text = re.sub(r'\s+', ' ', text)
    # Remove common HTML entities
    text = text.replace('&nbsp;', ' ')
    text = text.replace('&amp;', '&')
    text = text.replace('&lt;', '<')
    text = text.replace('&gt;', '>')
    
    return text.strip()

def analyze_domain_responses(ws_answers, maturity_key):
    """Analyze which domains (columns A-F/G) have answered which questions"""
    debug_print("=== ANALYZING DOMAIN RESPONSES ===")
    debug_print(f"Using {maturity_key} stage configuration")
    
    # Get configuration based on maturity level
    config = PDF_CONFIG[maturity_key]
    domain_start_row = config["DOMAIN_START_ROW"]
    domain_columns = config["DOMAIN_COLUMNS"]
    flag_value = config["FLAG_VALUE"]
    
    debug_print(f"Domain start row: {domain_start_row}")
    debug_print(f"Domain columns: {domain_columns}")
    debug_print(f"Flag value: {flag_value}")
    
    # Get domain names from row 1
    domain_names = []
    for col_idx in domain_columns:
        domain_name = ws_answers.cell(1, col_idx).value
        if domain_name and str(domain_name).strip():
            domain_names.append((col_idx, str(domain_name).strip()))
            debug_print(f"Found domain in column {col_idx}: {domain_name}")
    
    if not domain_names:
        debug_print("No domain names found in header row")
        return {}
    
    # Analyze responses for each domain
    domain_responses = {}
    max_row = ws_answers.max_row or 1000
    
    for col_idx, domain_name in domain_names:
        debug_print(f"Analyzing responses for {domain_name} (column {col_idx})")
        
        answered_questions = []
        
        # Look for X marks starting from domain_start_row
        for row_idx in range(domain_start_row, max_row + 1):
            cell_value = ws_answers.cell(row_idx, col_idx).value
            
            if isinstance(cell_value, str) and cell_value.strip().upper() == flag_value:
                # Found an X mark, record this row
                answered_questions.append(row_idx)
                # debug_print(f"  Found X mark at row {row_idx}")
        
        if answered_questions:
            domain_responses[domain_name] = {
                'column': col_idx,
                'answered_rows': answered_questions
            }
            debug_print(f"Domain {domain_name} answered {len(answered_questions)} questions")
        else:
            debug_print(f"Domain {domain_name} has no responses")
    
    return domain_responses


def get_html_questions_mapping(ws_html):
    """Create mapping of question codes to HTML formatted questions"""
    debug_print("=== CREATING HTML QUESTIONS MAPPING ===")
    
    if not ws_html:
        debug_print("No HTML evaluation sheet found")
        return {}
    
    html_mapping = {}
    max_row = ws_html.max_row or 1000
    
    # Look for HTML content in the sheet
    # Based on your screenshot, HTML content appears to be in columns around Q-V
    for row_idx in range(1, max_row + 1):
        # Check multiple columns for HTML content
        for col_idx in range(16, 26):  # Columns P-Z approximately
            cell_value = ws_html.cell(row_idx, col_idx).value
            
            if cell_value and isinstance(cell_value, str):
                cell_text = str(cell_value).strip()
                
                # Look for question codes in the HTML content
                # Pattern: look for 8-digit codes that might be question IDs
                code_matches = re.findall(r'\b(\d{8})\b', cell_text)
                
                if code_matches and ('html' in cell_text.lower() or '<' in cell_text):
                    for code in code_matches:
                        if code not in html_mapping:
                            html_mapping[code] = clean_html_text(cell_text)
                            debug_print(f"Mapped question code {code} to HTML content")
    
    debug_print(f"Created HTML mapping for {len(html_mapping)} questions")
    return html_mapping

def generate_pdfs_from_excel(tool_code, excel_path, maturity_key):
    """Generate domain-specific PDFs based on X marks analysis with enhanced styling and proper heading structure"""
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch
        from reportlab.lib.colors import HexColor
        from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
        from reportlab.pdfgen import canvas
    except ImportError:
        debug_print("reportlab not installed. Install with: pip install reportlab")
        return False
    
    if not excel_path.exists():
        debug_print(f"Excel file not found: {excel_path}")
        return False
    
    safe_tool_id = tool_code.replace("/", "_").replace("\\", "_").replace(":", "_")
    # Create PDF output directory within the same folder as the Excel file
    pdf_dir = OUTPUT_DIR / safe_tool_id / "PDF" 

    pdf_dir.mkdir(parents=True, exist_ok=True)
    
    try:
        wb = openpyxl.load_workbook(excel_path, data_only=True)        
        # Find the answers sheet (first sheet with X marks)
        ws_answers = None
        for sheet_name in ["Innovator Answers", "InnovatorAnswers", "Innovator_Answers"]:
            if sheet_name in wb.sheetnames:
                ws_answers = wb[sheet_name]
                debug_print(f"Found answers sheet: {sheet_name}")
                break
        
        if not ws_answers:
            ws_answers = wb.active
            debug_print("Using active worksheet for answers")
        
        # Find the HTML evaluation sheet (second sheet with HTML content)
        ws_html = None
        for sheet_name in ["HTML Evaluation Compilation", "HTMLEvaluationCompilation", "HTML_Evaluation_Compilation", "UserTypeIV_Answers"]:
            if sheet_name in wb.sheetnames:
                ws_html = wb[sheet_name]
                debug_print(f"Found HTML sheet: {sheet_name}")
                break
        
        # Analyze domain responses
        domain_responses = analyze_domain_responses(ws_answers, maturity_key)        
        if not domain_responses:
            debug_print("No domain responses found, generating standard PDF")
            return generate_standard_pdf(tool_code, excel_path, wb, ws_answers)
        
        # Create HTML questions mapping
        html_mapping = get_html_questions_mapping(ws_html)
        
        # Get tool information
        mdii_version = "Unknown"
        try:
            # Try to find MDII version from various possible locations
            for sheet in wb.worksheets:
                for row_idx in range(1, 20):
                    for col_idx in range(1, 15):
                        cell_value = sheet.cell(row_idx, col_idx).value
                        if cell_value and isinstance(cell_value, str):
                            if "mdii version" in str(cell_value).lower():
                                mdii_version = str(cell_value).strip()
                                break
        except Exception as e:
            debug_print(f"Could not read MDII version: {e}")
        
        # Setup enhanced PDF styles
        styles = getSampleStyleSheet()
        
        # Main title style
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            spaceAfter=30,
            spaceBefore=20,
            textColor=HexColor('#1a365d'),
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        )
        
        # Subtitle style
        subtitle_style = ParagraphStyle(
            'CustomSubtitle',
            parent=styles['Normal'],
            fontSize=14,
            spaceAfter=25,
            spaceBefore=10,
            textColor=HexColor('#2d3748'),
            alignment=TA_CENTER,
            fontName='Helvetica',
            italic=True
        )
        
        # Header information box style
        header_style = ParagraphStyle(
            'CustomHeader',
            parent=styles['Normal'],
            fontSize=11,
            spaceAfter=20,
            spaceBefore=10,
            backColor=HexColor('#f7fafc'),
            leftIndent=15,
            rightIndent=15,
            borderColor=HexColor('#4299e1'),
            borderWidth=2,
            borderPadding=15,
            alignment=TA_LEFT,
            fontName='Helvetica'
        )
        
        # Section header style
        section_header_style = ParagraphStyle(
            'SectionHeader',
            parent=styles['Heading2'],
            fontSize=16,
            spaceAfter=20,
            spaceBefore=25,
            textColor=HexColor('#2b6cb0'),
            fontName='Helvetica-Bold',
            borderColor=HexColor('#4299e1'),
            borderWidth=1,
            borderPadding=8,
            backColor=HexColor('#ebf8ff'),
            leftIndent=10
        )
        
        # Main heading style (Dimension)
        main_heading_style = ParagraphStyle(
            'MainHeading',
            parent=styles['Heading2'],
            fontSize=14,
            spaceAfter=8,
            spaceBefore=20,
            textColor=HexColor('#1e3a8a'),
            fontName='Helvetica-Bold',
            leftIndent=0,
            borderColor=HexColor('#3b82f6'),
            borderWidth=1,
            borderPadding=6,
            backColor=HexColor('#eff6ff')
        )
        
        # Sub-heading style (Sub-dimension)
        sub_heading_style = ParagraphStyle(
            'SubHeading',
            parent=styles['Heading3'],
            fontSize=12,
            spaceAfter=6,
            spaceBefore=15,
            textColor=HexColor('#1e40af'),
            fontName='Helvetica-Bold',
            leftIndent=15,
            borderColor=HexColor('#60a5fa'),
            borderWidth=0.5,
            borderPadding=4,
            backColor=HexColor('#f0f9ff')
        )
        
        # Context heading style (Contextual Information - italic)
        context_heading_style = ParagraphStyle(
            'ContextHeading',
            parent=styles['Heading3'],
            fontSize=11,
            spaceAfter=5,
            spaceBefore=12,
            textColor=HexColor('#374151'),
            fontName='Helvetica-BoldOblique',
            leftIndent=15,
            italic=True
        )
        
        # Description style (for content under headings)
        description_style = ParagraphStyle(
            'Description',
            parent=styles['Normal'],
            fontSize=10,
            spaceAfter=10,
            spaceBefore=3,
            leftIndent=20,
            rightIndent=15,
            alignment=TA_JUSTIFY,
            fontName='Helvetica',
            textColor=HexColor('#4b5563')
        )
        
        # Enhanced question-answer style (single line)
        qa_style = ParagraphStyle(
            'QuestionAnswer',
            parent=styles['Normal'],
            fontSize=10,
            spaceAfter=8,
            spaceBefore=3,
            leftIndent=25,
            rightIndent=15,
            alignment=TA_JUSTIFY,
            fontName='Helvetica'
        )
        
        # Alternating row colors for better readability
        qa_style_alt = ParagraphStyle(
            'QuestionAnswerAlt',
            parent=qa_style,
            backColor=HexColor('#f8f9fa'),
            borderColor=HexColor('#e2e8f0'),
            borderWidth=0.5,
            borderPadding=8
        )
        
        def identify_content_type(question_text, answer_text):
            """Identify the type of content based on text patterns"""
            if not question_text:
                return "unknown"
            
            question_lower = question_text.lower().strip()
            
            # Check if it's a main dimension heading
            if question_lower.startswith("dimension:"):
                return "main_heading"
            
            # Check if it's a sub-dimension heading
            if question_lower.startswith("sub-dimension:"):
                return "sub_heading"
            
            # Check if it's contextual information
            if "contextual information" in question_lower:
                return "context_heading"
            
            # Check if it's a description (usually follows headings and has "No response provided")
            if (question_lower.startswith("description:") and 
                (not answer_text or answer_text.strip() == "" or "no response provided" in str(answer_text).lower())):
                return "description"
            
            # Regular question with answer
            return "question_answer"
        
        pdf_count = 0
        
        # Generate PDF for each domain that has responses
        for domain_name, domain_info in domain_responses.items():
            try:
                debug_print(f"Creating PDF for domain: {domain_name}")
                
                # Create PDF filename
                pdf_name = f"{safe_tool_id}_{domain_name.replace(' ', '_')}_MDII_Evaluation_Report.pdf"
                pdf_path = pdf_dir / pdf_name
                
                # Create PDF document with better margins
                doc = SimpleDocTemplate(
                    str(pdf_path),
                    pagesize=A4,
                    rightMargin=inch*0.6,
                    leftMargin=inch*0.6,
                    topMargin=inch*0.8,
                    bottomMargin=inch*0.8
                )
                
                story = []
                
                # Enhanced title page
                story.append(Paragraph("MDII DOMAIN EVALUATION REPORT", title_style))
                story.append(Paragraph("Digital Innovation Assessment", subtitle_style))
                story.append(Spacer(1, 20))
                
                # Enhanced header information with better formatting
                header_info = f"""
                <b><font color='#2b6cb0' size='12'>Digital Tool Code:</font></b> <font color='#1a202c'>{tool_code}</font><br/>
                <b><font color='#2b6cb0' size='12'>MDII Version:</font></b> <font color='#1a202c'>{mdii_version}</font><br/>
                <b><font color='#2b6cb0' size='12'>Domain Expert:</font></b> <font color='#1a202c'>{domain_name}</font><br/>
                <b><font color='#2b6cb0' size='12'>Report Generated:</font></b> <font color='#1a202c'>{time.strftime('%B %d, %Y at %H:%M')}</font><br/>
                """
                story.append(Paragraph(header_info, header_style))
                story.append(Spacer(1, 25))
                
                # Section header with enhanced styling
                story.append(Paragraph(f"📋 Evaluation Questions & Responses - {domain_name}", section_header_style))
                story.append(Spacer(1, 15))
                
                question_count = 0
                
                # Process each answered question for this domain
                for row_idx in domain_info['answered_rows'][3:]:
                    try:
                        # Get question code from column H (code column) - UPDATED FOR MATURITY
                        question_code = None
                        code_col = 9 if maturity_key == "advanced" else 8  # Column I for advanced, H for early

                        code_value = ws_answers.cell(row_idx, code_col).value
                        if code_value and str(code_value).strip().isdigit():
                            if len(str(code_value).strip()) == 8:
                                question_code = str(code_value).strip()

                        # Get question text - UPDATED FOR MATURITY
                        question_text = None
                        question_col = 11 if maturity_key == "advanced" else 10  # Column K for advanced, J for early
                        text_value = ws_answers.cell(row_idx, question_col).value
                        if text_value and str(text_value).strip():
                            question_text = str(text_value).strip()

                        # Get answer text - UPDATED FOR MATURITY
                        answer_text = None
                        answer_col = 12 if maturity_key == "advanced" else 11  # Column L for advanced, K for early
                        ans_value = ws_answers.cell(row_idx, answer_col).value
                        if ans_value and str(ans_value).strip():
                            answer_text = str(ans_value).strip()

                        # Use HTML version if available and better
                        if question_code and question_code in html_mapping:
                            html_text = html_mapping[question_code]
                            if len(html_text) > len(question_text or ""):
                                question_text = html_text

                        # Process content based on type (KEEP ALL EXISTING LOGIC)
                        if question_text and len(question_text.strip()) > 10:
                            clean_question = clean_html_text(question_text)
                            clean_question = re.sub(r'\[.*?\]', '', clean_question).strip()

                            if clean_question:
                                # Identify content type
                                content_type = identify_content_type(clean_question, answer_text)

                                if content_type == "main_heading":
                                    # Main heading (Dimension)
                                    heading_text = clean_question.replace("Dimension:", "").strip()
                                    story.append(Paragraph(f"📊 {heading_text}", main_heading_style))
                                    story.append(Spacer(1, 10))

                                elif content_type == "sub_heading":
                                    # Sub-heading (Sub-dimension)
                                    heading_text = clean_question.replace("Sub-dimension:", "").strip()
                                    story.append(Paragraph(f"▶ {heading_text}", sub_heading_style))
                                    story.append(Spacer(1, 8))

                                elif content_type == "context_heading":
                                    # Context heading (Contextual Information)
                                    story.append(Paragraph(clean_question, context_heading_style))
                                    story.append(Spacer(1, 6))

                                elif content_type == "description":
                                    # Description text (under headings)
                                    description_text = clean_question.replace("Description:", "").strip()
                                    story.append(Paragraph(description_text, description_style))
                                    story.append(Spacer(1, 12))

                                else:
                                    # Regular question-answer pair (KEEP EXISTING ANSWER LOGIC)
                                    # Clean and format answer
                                    if answer_text and answer_text.strip() != "":
                                        clean_answer = clean_html_text(answer_text)
                                        if clean_answer and clean_answer != "--":
                                            answer_formatted = f'<font color="#059669"><i>"{clean_answer}"</i></font>'
                                        else:
                                            answer_formatted = '<font color="#dc2626"><i>"No response provided"</i></font>'
                                    else:
                                        answer_formatted = '<font color="#dc2626"><i>"No response provided"</i></font>'

                                    # Enhanced formatting: Question number + Question + Answer
                                    question_number = f'<b><font color="#1e40af" size="11">{question_count + 1}.</font></b>'
                                    formatted_question = f'<b><font color="#374151">{clean_question}</font></b>'

                                    # Combine with better spacing and styling
                                    combined_line = f'{question_number} {formatted_question} — {answer_formatted}'

                                    # Alternate row styling for better readability
                                    current_style = qa_style if question_count % 2 == 0 else qa_style_alt

                                    story.append(Paragraph(combined_line, current_style))
                                    story.append(Spacer(1, 6))

                                    question_count += 1

                    except Exception as e:
                        debug_print(f"Error processing question at row {row_idx}: {e}")
                        continue

                
                # Footer information
                story.append(Spacer(1, 30))
                footer_info = f"""
                <i><font color='#6b7280' size='9'>
                This report contains structured evaluation content from the {domain_name} domain expert.<br/>
                Generated automatically from MDII assessment data on {time.strftime('%Y-%m-%d %H:%M:%S')}.
                </font></i>
                """
                footer_style = ParagraphStyle(
                    'Footer',
                    parent=styles['Normal'],
                    fontSize=9,
                    alignment=TA_CENTER,
                    spaceAfter=10,
                    textColor=HexColor('#6b7280')
                )
                story.append(Paragraph(footer_info, footer_style))
                
                # Build PDF
                doc.build(story)
                debug_print(f"Generated PDF: {pdf_path}")
                pdf_count += 1
                
            except Exception as e:
                debug_print(f"Error creating PDF for domain {domain_name}: {e}")
                continue
        
        debug_print(f"Created {pdf_count} domain-specific PDFs in: {pdf_dir}")
        return pdf_count > 0
        
    except Exception as e:
        debug_print(f"Error processing Excel file for domain PDFs: {e}")
        return False
    finally:
        wb.close()
def generate_standard_pdf(tool_code, excel_path, wb, ws_answers):
    """Generate standard PDF if no domain responses found (fallback)"""
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch
        from reportlab.lib.colors import HexColor
    except ImportError:
        debug_print("reportlab not installed for standard PDF generation")
        return False
    
    debug_print("Generating standard fallback PDF")
    
    safe_tool_id = tool_code.replace("/", "_").replace("\\", "_").replace(":", "_")
    pdf_dir = OUTPUT_DIR / safe_tool_id / "PDF"  # Simplified to OUTPUT_DIR/tool_id/PDF
    pdf_dir.mkdir(parents=True, exist_ok=True)
    
    styles = getSampleStyleSheet()
    
    pdf_name = f"{safe_tool_id}_MDII_Standard_Report.pdf"
    pdf_path = pdf_dir / pdf_name
    
    doc = SimpleDocTemplate(str(pdf_path), pagesize=A4)
    story = []
    
    story.append(Paragraph("MDII EVALUATION REPORT", styles['Title']))
    story.append(Spacer(1, 20))
    story.append(Paragraph(f"Tool Code: {tool_code}", styles['Normal']))
    story.append(Paragraph(f"Generated: {time.strftime('%Y-%m-%d %H:%M:%S')}", styles['Normal']))
    story.append(Spacer(1, 20))
    story.append(Paragraph("No domain-specific responses found in the expected format.", styles['Normal']))
    
    doc.build(story)
    debug_print(f"Created standard PDF: {pdf_path}")
    return True

# Add this enhanced debug function to your main.py

def debug_usertype2_data(tool_id, maturity_key):
    """Debug function to check UserType2 data availability"""
    debug_print(f"=== DEBUGGING USERTYPE2 DATA AVAILABILITY ===")
    debug_print(f"Tool ID: {tool_id}")
    debug_print(f"Maturity key: {maturity_key}")
    debug_print(f"Available UserType2 forms: {USERTYPE2_FORMS}")
    
    form_id = USERTYPE2_FORMS.get(maturity_key)
    if not form_id:
        debug_print(f"❌ No form ID found for maturity '{maturity_key}'")
        return
    
    debug_print(f"Using form ID: {form_id}")
    
    try:
        # Fetch all data from UserType2 form
        debug_print("Fetching all UserType2 data...")
        usertype2_data = fetch_kobo_data(form_id)
        debug_print(f"Total UserType2 records found: {len(usertype2_data)}")
        
        if len(usertype2_data) == 0:
            debug_print("❌ NO UserType2 data found in this form at all!")
            debug_print("This means no UserType2 evaluations have been submitted yet.")
            return
        
        # Show first few records structure
        debug_print("=== SAMPLE UserType2 RECORD STRUCTURE ===")
        if usertype2_data:
            sample_record = usertype2_data[0]
            debug_print("Sample record keys (first 20):")
            keys = list(sample_record.keys())[:20]
            for i, key in enumerate(keys):
                debug_print(f"  {i+1}. {key}")
            
            if len(keys) > 20:
                debug_print(f"  ... and {len(sample_record.keys()) - 20} more keys")
        
        # Check tool IDs in all records
        debug_print("=== CHECKING TOOL IDs IN USERTYPE2 RECORDS ===")
        found_tool_ids = set()
        possible_fields = [
            "group_requester/Q_13110000",
            "Q_13110000", 
            "group_requester/Q_1311000",
            "tool_id",
            "ID"
        ]
        
        for i, record in enumerate(usertype2_data[:10]):  # Check first 10 records
            record_tool_id = ""
            found_in_field = None
            
            for field in possible_fields:
                if field in record and record[field]:
                    record_tool_id = str(record[field]).strip()
                    found_in_field = field
                    break
            
            debug_print(f"Record {i+1}: Tool ID = '{record_tool_id}' (from field: {found_in_field})")
            if record_tool_id:
                found_tool_ids.add(record_tool_id)
        
        debug_print(f"=== SUMMARY ===")
        debug_print(f"Looking for tool ID: '{tool_id}'")
        debug_print(f"Found tool IDs in UserType2 data: {sorted(found_tool_ids)}")
        
        if str(tool_id) in found_tool_ids:
            debug_print(f"✅ SUCCESS: Tool ID '{tool_id}' found in UserType2 data!")
        else:
            debug_print(f"❌ PROBLEM: Tool ID '{tool_id}' NOT found in UserType2 data")
            debug_print("Possible reasons:")
            debug_print("1. No UserType2 evaluation submitted for this tool yet")
            debug_print("2. Tool ID was entered differently in UserType2 form")
            debug_print("3. Different field name used for tool ID")
        
    except Exception as e:
        debug_print(f"❌ Error debugging UserType2 data: {e}")

# ==== MAIN FUNCTION ====
def main():
    if len(sys.argv) < 2:
        debug_print("Usage: python main.py <TOOL_ID> [--pdf-only|--innovator-only]")
        print("Error: Missing tool ID argument")
        sys.exit(1)

    tool_id = sys.argv[1]
    
    # Parse mode arguments
    pdf_only = False
    innovator_only = False
    
    debug_print(f"Command line arguments: {sys.argv}")
    
    if len(sys.argv) > 2:
        mode = sys.argv[2]
        debug_print(f"Mode argument received: '{mode}'")
        if mode == "--pdf-only":
            pdf_only = True
        elif mode == "--innovator-only":
            innovator_only = True
    else:
        debug_print("No mode argument - running in FULL mode")
    
    debug_print(f"Processing Tool ID: {tool_id}")
    debug_print(f"PDF only mode: {pdf_only}")
    debug_print(f"Innovator only mode: {innovator_only}")
    debug_print(f"FULL mode (UserType2 + All PDFs): {not pdf_only and not innovator_only}")
    debug_print(f"Script directory: {SCRIPT_DIR}")
    debug_print(f"Output directory: {OUTPUT_DIR}")

    safe_tool_id = tool_id.replace("/", "_").replace("\\", "_").replace(":", "_")    

    if pdf_only:
        debug_print("=== RUNNING IN PDF-ONLY MODE ===")
        
        excel_path = OUTPUT_DIR / safe_tool_id / f"{safe_tool_id}_MDII_Toolkit.xlsm"

        if not excel_path.exists():
            excel_path = Path.home() / "Documents" / f"output_{safe_tool_id}.xlsm"
        
        if not excel_path.exists():
            error_msg = f"Excel file not found for tool ID '{tool_id}'. Expected locations:\n"
            error_msg += f"  - {OUTPUT_DIR / safe_tool_id / 'Innovator' / f'{safe_tool_id}_MDII_Toolkit.xlsm'}\n"
            error_msg += f"  - {Path.home() / 'Documents' / f'output_{safe_tool_id}.xlsm'}"
            debug_print(f"Error: {error_msg}")
            print(f"Error: {error_msg}")
            sys.exit(1)
        
        debug_print(f"Found Excel file: {excel_path}")
        
        try:
            wb = openpyxl.load_workbook(excel_path, data_only=True)
            maturity_key = "advanced"  # Default
            
            # Try to find MDII version from the Excel file to determine maturity
            for sheet in wb.worksheets:
                for row_idx in range(1, 20):
                    for col_idx in range(1, 15):
                        cell_value = sheet.cell(row_idx, col_idx).value
                        if cell_value and isinstance(cell_value, str):
                            if "early stage" in str(cell_value).lower():
                                maturity_key = "early"
                                break
                            elif "advanced stage" in str(cell_value).lower():
                                maturity_key = "advanced"
                                break
            
            wb.close()
            debug_print(f"Detected maturity level: {maturity_key}")
            
            success = generate_pdfs_from_excel(safe_tool_id, excel_path, maturity_key)
            if success:
                print(f"Domain-specific PDFs generated successfully for tool ID: {tool_id}")
            else:
                print(f"Error: PDF generation failed")
                sys.exit(1)
        except Exception as e:
            debug_print(f"Error generating PDFs: {e}")
            print(f"Error: {e}")
            sys.exit(1)
        
        return

    debug_print("=== RUNNING IN PROCESSING MODE ===")
    
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

    debug_print("Fetching survey data...")
    try:
        survey_data = find_survey_records(tool_id)
    except Exception as e:
        debug_print(f"Error fetching survey data: {e}")
        print(f"Error: {e}")
        sys.exit(1)

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
    
    tool_folder = OUTPUT_DIR / safe_tool_id  

    tool_folder.mkdir(parents=True, exist_ok=True)

    output_path = tool_folder / f"{safe_tool_id}_MDII_Toolkit.xlsm"

    try:
        copy_and_fill_template(template_path, output_path, tool_name, tool_id, maturity_label, maturity_key, survey_data)
        debug_print(f"SUCCESS! Excel file created at: {output_path}")
        print(f"Excel file created: {str(output_path)}")
        
        # Handle different modes
        if innovator_only:
            debug_print("=== INNOVATOR-ONLY MODE: Skipping UserTypeII sheet ===")
            debug_print("Generating domain PDFs only...")
            try:
                success = generate_pdfs_from_excel(safe_tool_id, output_path, maturity_key)
                if success:
                    debug_print("Domain-specific PDFs generated successfully!")
                    print("Domain-specific PDFs generated successfully!")
                else:
                    debug_print("PDF generation failed, but Excel file was created successfully")
                    print("Warning: PDF generation failed, but Excel file was created successfully")
            except Exception as e:
                debug_print(f"PDF generation failed: {e}")
                print(f"Warning: PDF generation failed: {e}")
                print("Excel file was created successfully")
        else:
            debug_print("=== FULL MODE: Filling UserTypeII + UserTypeIII + UserTypeIV sheets + generating all PDFs ===")
            
            # Fill UserTypeII sheet
            debug_print("Filling UserTypeII_Answers sheet...")
            try:
                usertype2_success = fill_usertype2_sheet(output_path, tool_id, maturity_key)
                if usertype2_success:
                    debug_print("UserTypeII sheet filled successfully!")
                    print("UserTypeII sheet filled successfully!")
                else:
                    debug_print("UserTypeII sheet filling failed or no data found")
                    print("Warning: UserTypeII sheet filling failed or no data found")
            except Exception as e:
                debug_print(f"UserTypeII sheet filling failed: {e}")
                print(f"Warning: UserTypeII sheet filling failed: {e}")
            
            # Fill UserTypeIII sheet
            debug_print("Filling UserTypeIII_Answers sheet...")
            try:
                usertype3_success = fill_usertype3_sheet(output_path, tool_id, maturity_key)
                if usertype3_success:
                    debug_print("UserTypeIII sheet filled successfully!")
                    print("UserTypeIII sheet filled successfully!")
                else:
                    debug_print("UserTypeIII sheet filling failed or no data found")
                    print("Warning: UserTypeIII sheet filling failed or no data found")
            except Exception as e:
                debug_print(f"UserTypeIII sheet filling failed: {e}")
                print(f"Warning: UserTypeIII sheet filling failed: {e}")
            
            # Fill UserTypeIV sheet  
            debug_print("Filling UserTypeIV_Answers sheet...")
            try:
                usertype4_success = fill_usertype4_sheet(output_path, tool_id, maturity_key)
                if usertype4_success:
                    debug_print("UserTypeIV sheet filled successfully!")
                    print("UserTypeIV sheet filled successfully!")
                else:
                    debug_print("UserTypeIV sheet filling failed or no data found")
                    print("Warning: UserTypeIV sheet filling failed or no data found")
            except Exception as e:
                debug_print(f"UserTypeIV sheet filling failed: {e}")
                print(f"Warning: UserTypeIV sheet filling failed: {e}")
            
            # Generate PDFs only for non-usertype mode
                                
            debug_print("Automatically generating all PDFs...")
            try:
                success = generate_pdfs_from_excel(safe_tool_id, output_path, maturity_key)
                if success:
                    debug_print("All PDFs generated successfully!")
                    print("All PDFs generated successfully!")
                else:
                    debug_print("PDF generation failed, but Excel file was created successfully")
                    print("Warning: PDF generation failed, but Excel file was created successfully")
            except Exception as e:
                debug_print(f"PDF generation failed: {e}")
                print(f"Warning: PDF generation failed: {e}")
                print("Excel file was created successfully")

        
    except Exception as e:
        debug_print(f"Error creating toolkit: {e}")
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()