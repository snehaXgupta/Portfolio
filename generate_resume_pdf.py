import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER

def create_resume(output_path):
    # Letter size: 612 x 792 points. Margins: 36pt (0.5 inch)
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    name_style = ParagraphStyle(
        'ResumeName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        textColor=colors.HexColor('#000000')
    )
    
    contact_style = ParagraphStyle(
        'ResumeContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#1a1a1a')
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=colors.HexColor('#000000'),
        spaceBefore=8,
        spaceAfter=3
    )
    
    body_bold = ParagraphStyle(
        'BodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor('#000000')
    )
    
    body_italic = ParagraphStyle(
        'BodyItalic',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=11.5,
        textColor=colors.HexColor('#222222')
    )
    
    body_text = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=11.5,
        textColor=colors.HexColor('#222222')
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#222222'),
        leftIndent=12,
        firstLineIndent=-10,
        spaceBefore=1.5
    )

    story = []

    # 1. Header
    story.append(Paragraph("Sneha Gupta", name_style))
    story.append(Spacer(1, 3))
    
    contact_p1 = "Lucknow, UP &nbsp;&nbsp;&bull;&nbsp;&nbsp; +91 8840128757"
    contact_p2 = "shubhigupta1078@gmail.com &nbsp;&nbsp;&bull;&nbsp;&nbsp; <u>linkedin.com/in/sneha-gupta-8701d1078/</u> &nbsp;&nbsp;&bull;&nbsp;&nbsp; <u>github.com/snehaXgupta</u>"
    story.append(Paragraph(contact_p1, contact_style))
    story.append(Paragraph(contact_p2, contact_style))
    story.append(Spacer(1, 4))

    # Helper for Section Divider
    def add_section(title):
        story.append(Paragraph(title, section_heading))
        story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#000000'), spaceBefore=1, spaceAfter=4))

    # 2. Education
    add_section("Education")
    
    edu_data1 = [
        [Paragraph("<b>University of Lucknow</b>", body_bold), Paragraph("2022 – 2026", ParagraphStyle('RightBold', parent=body_bold, alignment=TA_RIGHT))],
        [Paragraph("<i>Bachelor of Technology, Computer Science Engineering - (CGPA: 8.4/10)</i>", body_italic), Paragraph("Lucknow, Uttar Pradesh", ParagraphStyle('RightText', parent=body_text, alignment=TA_RIGHT))]
    ]
    t_edu1 = Table(edu_data1, colWidths=[380, 160])
    t_edu1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 0), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_edu1)
    story.append(Spacer(1, 2))

    edu_data2 = [
        [Paragraph("<b>Subhash Public Senior Secondary School</b>", body_bold), Paragraph("2019 – 2021", ParagraphStyle('RightBold', parent=body_bold, alignment=TA_RIGHT))],
        [Paragraph("<i>Intermediate (83.6%)</i>", body_italic), Paragraph("Kanpur, Uttar Pradesh", ParagraphStyle('RightText', parent=body_text, alignment=TA_RIGHT))]
    ]
    t_edu2 = Table(edu_data2, colWidths=[380, 160])
    t_edu2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 0), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_edu2)

    # 3. Experience
    add_section("Experience")
    
    exp1_data = [
        [Paragraph("<b>Simpel Techlabs</b>", body_bold), Paragraph("April 2026 – Present", ParagraphStyle('RightBold', parent=body_bold, alignment=TA_RIGHT))],
        [Paragraph("<i>SDE Intern (Full Stack)</i>", body_italic), Paragraph("Lucknow", ParagraphStyle('RightText', parent=body_text, alignment=TA_RIGHT))]
    ]
    t_exp1 = Table(exp1_data, colWidths=[380, 160])
    t_exp1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 0), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_exp1)
    story.append(Paragraph("&bull; Built and deployed Prahari, a full-stack web app with secure auth, role-based access control and inventory management modules using PHP Laravel and MySQL.", bullet_style))
    story.append(Paragraph("&bull; Gained hands-on experience with backend optimization, SMS notification integration and production-grade application development.", bullet_style))
    story.append(Spacer(1, 3))

    exp2_data = [
        [Paragraph("<b>Codevirus Security</b>", body_bold), Paragraph("June 2025 – July 2025", ParagraphStyle('RightBold', parent=body_bold, alignment=TA_RIGHT))],
        [Paragraph("<i>Web Developer Intern</i>", body_italic), Paragraph("Lucknow", ParagraphStyle('RightText', parent=body_text, alignment=TA_RIGHT))]
    ]
    t_exp2 = Table(exp2_data, colWidths=[380, 160])
    t_exp2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 0), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_exp2)
    story.append(Paragraph("&bull; Contributed to AnantaDrive, a web hosting and cloud services platform, building responsive UIs with React.js and Tailwind CSS.", bullet_style))
    story.append(Paragraph("&bull; Integrated RESTful APIs (Node.js/Express.js) and Razorpay payment gateway, improving data load times by 18%.", bullet_style))

    # 4. Projects
    add_section("Projects")
    
    story.append(Paragraph("<b>FraudLens</b> | <i>Python, NLP, Scikit-learn, Flask, MySQL</i>", body_bold))
    story.append(Paragraph("&bull; Built an AI-powered fake review detection system using NLP and Machine Learning to identify suspicious product reviews and streamline fraud analysis.", bullet_style))
    story.append(Spacer(1, 3))

    story.append(Paragraph("<b>Manager Agent</b> | <i>PHP, Laravel, MySQL, Bootstrap, AJAX, jQuery, Ollama, Llama 3.1</i>", body_bold))
    story.append(Paragraph("&bull; Built and customized a Laravel/MySQL workforce management application with AI-driven analytics integration, covering requirement analysis, database design and end-to-end testing.", bullet_style))
    story.append(Paragraph("&bull; Migrated core schema to Oracle Database and implemented PL/SQL stored procedures and triggers for analytics logic.", bullet_style))

    # 5. Technical Skills
    add_section("Technical Skills")
    skills = [
        "<b>Languages:</b> Java, JavaScript, TypeScript, PHP, SQL, PL/SQL",
        "<b>Backend:</b> Spring Boot, Laravel, Node.js, Express.js, .NET, REST APIs",
        "<b>Frontend:</b> React.js, Next.js, Tailwind CSS, HTML, CSS",
        "<b>Databases:</b> MySQL, PostgreSQL, Oracle Database, DynamoDB, Prisma ORM",
        "<b>Cloud & Tools:</b> AWS (EC2, S3, IAM), Terraform, Docker, Ansible, Git, GitHub, Postman, Linux"
    ]
    for s in skills:
        story.append(Paragraph(f"&bull; {s}", bullet_style))

    # 6. Volunteering
    add_section("Volunteering")
    vol_data = [
        [Paragraph("<b>AWS Cloud Club, University of Lucknow</b>", body_bold), Paragraph("2025 – 2026", ParagraphStyle('RightBold', parent=body_bold, alignment=TA_RIGHT))],
        [Paragraph("<i>AWS Cloud Captain</i>", body_italic), Paragraph("Lucknow", ParagraphStyle('RightText', parent=body_text, alignment=TA_RIGHT))]
    ]
    t_vol = Table(vol_data, colWidths=[380, 160])
    t_vol.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 0), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_vol)
    story.append(Paragraph("&bull; Organized and led 5+ workshops, speaker sessions and hands-on cloud events focused on AWS and cloud computing fundamentals.", bullet_style))
    story.append(Paragraph("&bull; Engaged and mentored 200+ students from technical and delivered practical training on AWS services including EC2, S3, IAM, and VPC.", bullet_style))
    story.append(Paragraph("&bull; Simplified complex cloud concepts through real-world demonstrations and beginner-friendly learning resources.", bullet_style))

    # 7. Certifications
    add_section("Certifications")
    cert_data = [
        [Paragraph("&bull; <b>AWS Certified Cloud Practitioner (CLF-C02)</b> &ndash; Amazon Web Services", bullet_style), Paragraph("2026 – 2029", ParagraphStyle('RightText', parent=body_text, alignment=TA_RIGHT))],
        [Paragraph("&bull; <b>Postman API Fundamentals Student Expert</b> &ndash; Postman", bullet_style), Paragraph("", body_text)],
        [Paragraph("&bull; <b>Big Data</b> &ndash; Samsung Innovation Campus", bullet_style), Paragraph("", body_text)]
    ]
    t_cert = Table(cert_data, colWidths=[430, 110])
    t_cert.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 0), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_cert)

    doc.build(story)
    print(f"Successfully generated resume PDF at: {output_path}")

if __name__ == '__main__':
    target = os.path.abspath('assets/resume.pdf')
    create_resume(target)
