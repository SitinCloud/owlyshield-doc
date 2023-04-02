# Novelty Detection with Data Drift

Novelty detection is an essential technique used to identify new or unusual patterns in data, which may indicate potential security threats or vulnerability exploitation. In the context of cybersecurity, one way to apply novelty detection is by monitoring data drift in how applications use the file system. In this approach, we assume that directories have already been clustered based on file updates. We will focus on using the Jaccard distance on these clusters to detect novelty through data drift.

## Using Jaccard Distance on Clusters
The Jaccard distance is a metric that measures the dissimilarity between two sets. It is calculated using the Jaccard coefficient, which is the size of the intersection of two sets divided by the size of their union. The Jaccard distance is then 1 minus the Jaccard coefficient. Given two sets A and B:

```
Jaccard coefficient = |A ∩ B| / |A ∪ B|
Jaccard distance = 1 - Jaccard coefficient
```

In the context of novelty detection with data drift, the sets represent clusters of directories with updated files. By calculating the Jaccard distance between different clusters, we can identify the degree of dissimilarity between them. The Jaccard distance ranges from 0 (identical clusters) to 1 (completely different clusters).

## Detecting Novelty through Data Drift
Once the Jaccard distances between clusters are calculated, the results can be analyzed for novelty detection. By examining the Jaccard distances, we can identify the following:

- Outliers: Directories with unusually high Jaccard distances compared to other directories in the same cluster may indicate novel or suspicious activities.
- Changes in cluster structure: Significant variations in the Jaccard distances between clusters over time may suggest data drift or potential security issues.

In this way, the Jaccard distance can be utilized to detect novelty through data drift in cybersecurity applications, specifically for monitoring how applications use the file system. By observing the dissimilarities between clusters and identifying outliers or changes in the cluster structure, we can effectively recognize unusual patterns and potential security threats.
