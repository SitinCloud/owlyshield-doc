---
outline: deep
---

# Introduction


[Owlyshield](https://github.com/SitinCloud/Owlyshield) is an open-source EDR (Endpoint Detection and Response) solution for Linux and Windows servers. It analyzes how processes use files to detect intrusions through vulnerability exploitation, with a particular focus on detecting Command and Control, exfiltration and impact tactics. The project is developed by [SitinCloud](https://www.sitincloud.com), a French company.

The main idea behind Owlyshield is to learn the normal behavior of applications (essentially trees of processes) and use this knowledge to identify weak signals of an attack through the use of novelty detection.

Owlyshield's extensibility is a key feature that sets it apart from other EDR solutions.  As a framework you can add new algorithms for malware detection, UEBA (User and Entity Behavior Analytics), and novelty detection. You can also use Owlyshield to record and replay file activities for training machine learning models, as we do with our autoencoder feature.

Owlyshield provides powerful and efficient endpoint detection and response capabilities for Linux, Windows, and IoT devices. Its unique focus on file activities makes it highly effective at detecting fileless malware and C&C beacons that may go unnoticed by other EDR solutions.


## Main Features

Although Owlyshield is a framework designed to be customized and extended, it also comes with pre-built, powerful features that are immediately usable :


- Advanced novelty detection with autoencoders (commercial version),
- Ransomware protection in real-time on Windows using XGBoost,
- Novelty detection with embedded training on both Linux (+IoT) and Windows,
- Auto-configuration of SELinux to automatically protect exposed applications (currently being developed).


## Real-Life Examples

Owlyshield provides a powerful solution for detecting and responding to threats in real-time. Here are three real-life examples of how Owlyshield protected our customers:

- An attacker exploited a critical CVE in an ESXi server to deploy a payload. Owlyshield detected weak signals of the attack on the ESXi server by analyzing the file activities and identifying unusual behavior in the ESXi process family, indicating the presence of a malicious process.
- A web application built with JHipster had a hidden URL that could be used to dump the JVM memory, but the infrastructure team was not aware of this vulnerability. Owlyshield was able to detect it was exploited by analyzing the file system for unusual activity related to creating the dump file,
- A large and expensive ERP system was accessed by teams of consultants from different countries. One of them, with admin rights, began to slowly corrupt specific files in the ERP system. The attacker used this tactic to make the corruption look like a series of bugs or glitches rather than a deliberate attack. 



