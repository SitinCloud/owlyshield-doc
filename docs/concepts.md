% backdoors

# Concepts

Owlyshield has a unique focus on file system activity, making it highly effective at detecting fileless malware and Command and Control (C&C) beacons that may go unnoticed by other EDR solutions. It is a behavioural analysis engine that consists of two essential components:

- A kernel module that intercepts significant events occurring on the file system.
- A user space module that analyzes the data collected by the kernel in real-time.


There are three distinct operations involved in Owlyshield runtime:

- The kernel module captures file system operations, such as VFS calls on Linux and IRPs on Windows. It also collects information on these operations, such as the number of bytes read or written and the entropy of the operation. The user-space module then receives this data in real-time.
- The user-space module preprocesses the data and presents it to various predictors, such as classifiers and regressors. Some of these predictors are embedded and can function independently, while others are external commercial features used for novelty detection.
- When operating on its own, the user-space module can detect malicious processes and attempt to terminate or suspend them. The system generates logs that may be used to feed SIEM systems, and a Wazuh connector is available for this purpose.


## The Kernel Module

### File system events 

Owlyshield uses two different technologies to collect metadata about input/output operations on both Linux and Windows. On Linux, Owlyshield utilizes eBPF to hook into the Virtual File System (VFS) functions and intercept and modify file system operations. By doing so, it can collect metadata such as the name and path of the accessed files, the user and process ID that initiated the operation, and the access mode and flags. On Windows, Owlyshield employs a Minifilter to intercept input/output request packets (IRPs) and collect similar metadata about file operations on the file system. By using both eBPF on Linux and a Minifilter on Windows, Owlyshield can provide a unified and consistent view of file operations across multiple platforms, which can be useful for monitoring and analyzing system behavior or detecting security threats.

In Rust, the unified view of metadata collected by Owlyshield on both Linux and Windows is represented by the DriverMessage structure. This structure contains a variety of fields that describe details about input/output operations, such as the file extension, file ID, number of bytes transferred, and file path. It also includes fields that indicate whether the file entropy was calculated by the driver, the process ID responsible for the operation, and the type and location of the file operation. Additionally, the structure contains fields related to the size of the file, the time of the execution of the I/O operation, and runtime features. By encapsulating this information in a standardized structure, Owlyshield can provide a consistent and easy-to-use interface for accessing and analyzing file system metadata across different platforms.



## The user-space module

The data collected by eBPF on Linux and minifilters on Windows is typically sent to a user-space module for analysis. This is because the kernel space, where eBPF and minifilters run, is a highly privileged and restricted environment that is not designed for data analysis and processing.

### Data preprocessing

#### Group identifiers (Gid)

In the context of process trees on both Linux and Windows, a Gid (group identifier) is a unique identifier that is associated with a family of processes that share a common parent process. Specifically, the Gid is used to identify the subtree of processes that are descendants of the root process (System on Windows, init on Linux) and are therefore related to each other.

::: warning
Gids, as defined here, are not related to Linux groups!
:::


::: details About processes trees on Windows and Linux
In both Windows and Linux, processes are organized into hierarchical structures known as process trees. At the top of the tree is the root process, which is typically initiated by the system and serves as the parent process for all other processes in the system.

On Windows, the root process is the "System" process, which has a process ID of 4. All other processes are launched as child processes of the System process, and each child process may in turn launch its own child processes. This forms a tree-like structure, with the System process at the root and multiple branches branching out to form the entire process tree.

On Linux, the root process is called "init," which is short for initialization. Init is responsible for starting and stopping system services, and it is the parent process for all other processes in the system. Similar to Windows, each child process on Linux can launch its own child processes, forming a tree-like structure with init at the root.
:::

#### Aggregating the Data

By aggregating the data by Gid, Owlyshield can gain insights into the behavior of related processes and detect abnormal activity that might indicate a security threat. For example, if a process subtree associated with a particular Gid starts to access or modify files in an unusual way, Owlyshield can generate an alert and notify the system administrator. Similarly, if a process subtree generates a large number of input/output operations in a short period of time, Owlyshield can identify this behavior as potentially suspicious and investigate further.

Overall, aggregating data by Gid is a powerful technique that can help Owlyshield monitor and protect the entire family of processes associated with a particular subtree, and quickly detect and respond to security threats.

The following table provides a breakdown of the Timestep structure attributes and their corresponding explanations:

| Attribute Name               | Explanation                                                            |
|------------------------------|------------------------------------------------------------------------|
| ops_read                     | Count of Read operations                                                |
| ops_setinfo                  | Count of SetInfo operations                                             |
| ops_written                  | Count of Write operations                                               |
| ops_open                     | Count of Handle Creation operations                                     |
| bytes_read                   | Total bytes read (by gid)                                               |
| bytes_written                | Total bytes written (by gid)                                            |
| entropy_read                 | Total entropy read                                                      |
| entropy_written              | Total entropy write                                                     |
| files_opened                 | File descriptors created                                                |
| files_deleted                | File descriptors deleted                                                |
| files_read                   | File descriptors read                                                   |
| files_renamed                | File descriptors renamed                                                |
| files_written                | File descriptors written                                                |
| extensions_read              | Unique extensions read count                                            |
| extensions_written           | Unique extensions write count                                           |
| extensions_written_doc       | Unique extensions written count (documents)                             |
| extensions_written_archives  | Unique extensions written count (archives)                              |
| extensions_written_db        | Unique extensions written count (DB)                                    |
| extensions_written_code      | Unique extensions written count (code)                                  |
| extensions_written_exe       | Unique extensions written count (executables)                           |
| dirs_with_files_created     | Directories having files created                                        |
| dirs_with_files_updated     | Directories having files updated                                        |
| pids                         | Number of pids in this gid process family                               |
| exe_exists                   | Process exe file still exists (father)?                                  |
| cluster_count                | Number of directories (with files updated) clusters created             |
| clusters_max_size            | Deepest cluster size                                                     |


The table presented below is an exemple of the result of the aggregation and computation of metadata collected by the kernel probe for every 50 I/O (input/output) operations. The probe collects data on various aspects of the I/O operations, such as file descriptors, unique extensions, directories with files, process ID, and the deepest cluster size. These metrics are aggregated and computed every 50 I/O operations, and the resulting data is displayed in the table with the appname and gid columns indicating the application name and the group ID for which the data was collected. Note that not all collected features are displayed in the table for the sake of conciseness.

| appname    | gid   | ops_read | ops_setinfo | ops_written | ops_open | bytes_read | bytes_written |
|------------|-------|----------|-------------|-------------|----------|------------|---------------|
| adonix.exe | 2-56  | 5020     | 81          | 2231        | 10948    | 418723780  | 8075244       |
| adonix.exe | 2-56  | 5020     | 81          | 2251        | 10948    | 418723780  | 8080363       |
| adonix.exe | 2-56  | 5023     | 81          | 2268        | 10948    | 419165280  | 8895424       |
| adonix.exe | 2-56  | 5027     | 81          | 2284        | 10948    | 419168580  | 8897510       |


#### Directories clusters

Owlyshield has a unique feature that allows it to cluster directories based on the file system activity of the process subtree associated with a particular Gid. This is done using a technique known as hierarchical clustering, which groups data points into a hierarchical structure based on their similarity. With hierarchical clustering, Owlyshield can group together directories that are frequently accessed or modified by the same family of processes, creating a map of how the family of processes is using the file system.


### Machine Learning

#### Ransomware classifier

#### Novelty detection

