# Introduction

Owlyshield is a versatile and open-source EDR (Endpoint Detection and Response) solution designed for Linux, Windows, and IoT devices. Developed by SitinCloud, a French company, Owlyshield specializes in detecting intrusions through vulnerability exploitation, with a primary focus on identifying Command and Control, exfiltration, and impact tactics. It achieves this by learning the normal behavior of applications and employing novelty detection to identify weak signals indicative of an attack.

As a highly extensible framework, Owlyshield enables users to incorporate additional algorithms for malware detection, UEBA (User and Entity Behavior Analytics), and novelty detection. It also facilitates the recording and replaying of file activities for training machine learning models, such as autoencoders.

# Key Features

While Owlyshield is designed for customization and extension, it boasts several built-in, high-performance features:

Advanced novelty detection using autoencoders (commercial version)
Real-time ransomware protection on Windows with XGBoost
Novelty detection featuring embedded training for both Linux (+IoT) and Windows
Auto-configuration of SELinux for automatic protection of exposed applications (currently in development)

# Real-Life Success Stories

Owlyshield's robust threat detection and response capabilities have proven invaluable in numerous real-world scenarios, including:

**ESXi Server Breach**: An attacker exploited a critical CVE in an ESXi server to deploy a payload. Owlyshield detected weak signals of the attack by analyzing file activities and identifying unusual behavior within the ESXi process family, revealing the presence of a malicious process.

**JHipster Web Application Vulnerability**: A JHipster-built web application had a concealed URL that allowed for JVM memory dumping, unbeknownst to the infrastructure team. Owlyshield detected the exploitation of this vulnerability by monitoring the file system for abnormal activity related to the creation of the dump file.

**ERP System Sabotage**: A large, expensive ERP system was accessed by consultants from various countries. One consultant with admin rights began to discreetly corrupt specific files in the ERP system, making it appear as a series of bugs or glitches rather than an intentional attack. Owlyshield detected the subtle file manipulations, thwarting the attacker's plans.

Owlyshield's unique approach to monitoring file activities, along with its extensibility and advanced features, sets it apart from other EDR solutions, making it a powerful asset in the fight against cybersecurity threats.