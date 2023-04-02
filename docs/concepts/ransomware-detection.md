# Owlyshield Ransomware Detection using XGBoost

Owlyshield is an EDR software designed to detect ransomware by monitoring their activity on the file disk. The software operates in two distinct modes:

Training mode: In this mode, Owlyshield writes a CSV file containing various features extracted from the monitored processes. This data is used to train the XGBoost machine learning model to identify ransomware effectively.
Real-time prediction mode: In this mode, Owlyshield uses the trained XGBoost model to predict whether the observed process activities are indicative of ransomware in real-time.

## CSV Data Collection for Training

Owlyshield collects and aggregates data from various process activities and stores them in a CSV file. The CSV file has a header row followed by multiple lines containing the following columns:

| Column                    | Description                                                                                       |
|---------------------------|---------------------------------------------------------------------------------------------------|
| app_name                  | Name of the application being monitored                                                           |
| gid                       | Unique identifier for each group of I/O operations                                                |
| ops_read                  | Number of read operations performed                                                               |
| ops_setinfo               | Number of set information operations performed                                                    |
| ops_written               | Number of write operations performed                                                              |
| ops_open                  | Number of open operations performed                                                               |
| bytes_read                | Total number of bytes read                                                                        |
| bytes_written             | Total number of bytes written                                                                     |
| entropy_read              | Entropy of the read data                                                                          |
| entropy_written           | Entropy of the written data                                                                       |
| files_opened              | Number of files opened                                                                            |
| files_deleted             | Number of files deleted                                                                           |
| files_read                | Number of files read                                                                              |
| files_renamed             | Number of files renamed                                                                           |
| files_written             | Number of files written                                                                           |
| extensions_read           | Number of unique file extensions read                                                             |
| extensions_written        | Number of unique file extensions written                                                          |
| extensions_written_doc    | Number of document file extensions written                                                        |
| extensions_written_archives| Number of archive file extensions written                                                         |
| extensions_written_db     | Number of database file extensions written                                                        |
| extensions_written_code   | Number of source code file extensions written                                                     |
| extensions_written_exe    | Number of executable file extensions written                                                      |
| dirs_with_files_created   | Number of directories with files created                                                          |
| dirs_with_files_updated   | Number of directories with files updated                                                          |
| pids                      | Number of process IDs involved in the operations                                                  |
| exe_exists                | Indicator if an executable file exists (1 for yes, 0 for no)                                      |
| clusters                  | Number of clusters identified in the group of I/O operations                                      |
| clusters_max_size         | Maximum size of a cluster in the group of I/O operations                                          |
| is_ransom                 | Indicator if the application is classified as ransomware (1 for ransomware, 0 for non-ransomware) |

Follows an example of such a csv used for training a XGBoost classifier:

| app_name                             | gid    | ops_read | ops_setinfo | ops_written | ops_open | bytes_read | bytes_written | entropy_read | entropy_written | files_opened | files_deleted | files_read | files_renamed | files_written | extensions_read | extensions_written | extensions_written_doc | extensions_written_archives | extensions_written_db | extensions_written_code | extensions_written_exe | dirs_with_files_created | dirs_with_files_updated | pids | exe_exists | clusters | clusters_max_size | is_ransom |
|--------------------------------------|--------|----------|-------------|-------------|----------|------------|--------------|--------------|----------------|--------------|---------------|------------|---------------|--------------|----------------|------------------|---------------------|-------------------------|------------------|--------------------|------------------|----------------------|--------------------|------|------------|----------|----------------|-----------|
| Ransom_exe_Avaddon_09_06_2020_1054KB.exe | 2-146  | 0        | 0           | 0           | 20       | 0          | 0            | 0            | 0              | 0            | 0             | 0          | 0             | 0            | 0              | 3                | 0                   | 0                       | 0                  | 0                  | 2                  | 0                    | 0                  | 1    | 1          | 0        | 0              | True      |
| Ransom_exe_Avaddon_09_06_2020_1054KB.exe | 2-146  | 5        | 0           | 0           | 35       | 32256      | 0            | 5            | 0              | 0            | 0             | 1          | 0             | 0            | 1              | 4                | 0                   | 0                       | 0                  | 0                  | 3                  | 0                    | 0                  | 1    | 1          | 0        | 0              | True      |
| Ransom_exe_Avaddon_09_06_2020_1054KB.exe | 2-146  | 9        | 0           | 0           | 51       | 75264      | 0            | 5            | 0              | 0            | 0             | 2          | 0             | 0            | 1              | 4                | 0                   | 0                       | 0                  | 0                  | 3                  | 0                    | 0                  | 1    | 1          | 0        | 0              | True      |


A new row is added to the CSV file for every 50 I/O operations (calls to VFS functions on Linux) observed in the monitored processes. This frequency ensures that the data collected is representative of the process behavior without being too sparse or too dense.

## Real-time Ransomware Prediction

In real-time prediction mode, Owlyshield continuously monitors and aggregates the same set of features as in the training mode. However, instead of writing the data to a CSV file, the data is stored in memory in a central structure. This structure is refreshed every 50 I/O operations, ensuring that the model is always working with the latest data.

## XGBoost Overview

XGBoost (Extreme Gradient Boosting) is a powerful, open-source machine learning library designed for efficient and scalable implementation of gradient boosted decision trees. It has gained immense popularity due to its excellent performance, flexibility, and ability to handle large datasets.

For Owlyshield, the XGBoost model is translated into plain Rust code, further enhancing the performance and efficiency of the model. This optimized implementation enables real-time ransomware detection while maintaining low resource usage.

## High-quality Training Data

The XGBoost model used by Owlyshield has been trained on an extensive dataset comprising recent ransomware samples and standard programs (non-malware). This diverse and up-to-date training data ensures that the model can effectively distinguish between ransomware activities and legitimate processes, minimizing the risk of false positives and false negatives.

## Time-independent Metrics: I/O vs. Time

Owlyshield employs I/O-based metrics instead of time-based metrics for several reasons. Firstly, I/O operations are more consistent and reliable across various hardware configurations, while time-based metrics may be influenced by hardware performance variations. This ensures that the ransomware detection remains accurate and robust across different client systems.

Secondly, using I/O operations as a metric allows for a more granular representation of process activities, providing a better understanding of the process behavior. This enables the XGBoost model to make more accurate predictions based on the observed features, further improving the effectiveness of the ransomware detection.

In conclusion, Owlyshield leverages the high-performance XGBoost machine learning library, optimized by translating decision trees into plain Rust code, to detect ransomware effectively. The model is trained on a diverse dataset of recent ransomware and standard programs, and it employs I/O-based metrics instead of time-based metrics to ensure accurate and reliable ransomware detection across various client hardware configurations.

