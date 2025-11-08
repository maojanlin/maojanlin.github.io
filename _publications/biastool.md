---
title: "Measuring, visualizing, and diagnosing reference bias with biastools"
collection: publications
category: manuscripts
permalink: /publication/biastool/
excerpt: "Recent alignment methods aim to reduce reference bias, where reads with non-reference alleles fail to align correctly. However, there is a lack of methods for analyzing reference bias. We present biastools, which measures and categorizes reference bias."
date: 2024-04-19
venue: "Genome Biology"
paperurl: "https://genomebiology.biomedcentral.com/articles/10.1186/s13059-024-03240-8"
citation: 'Lin, Mao-Jan, et al. "Measuring, visualizing, and diagnosing reference bias with biastools." Genome Biology 25.1 (2024): 101.'
---

Recent alignment methods aim to reduce reference bias, where reads with non-reference alleles fail to align correctly. However, there's a lack of methods for systematically analyzing reference bias. Here we present biastools, which measures, categorizes, and diagnose instances of reference bias. 

We categorize reference biases based on their causes. "Loss" indicates a bias event due to reads mapping elsewhere than their true point of origin. "Flux" indicates bias from gaining mipmapped reads from other sites. "Local" indicates bias originating from local repeat content as well as sequencing errors the create ambiguity in gap placement.  

In the simulation scenario, differences in allelic balance among simulation, read mapping, and allele assignment can help identify whether a variant is affected by reference bias and its specific bias type. 

We assess reference bias through alignments using Bowtie 2, BWA-MEM, and VG Giraffe. Our findings confirm that incorporating more variants in the Giraffe genome graph reduces the reference bias. Additionally, we observe that end-to-end alignment, Bowtie 2 and BWA-MEM with -L 30 option, yields more balanced result for gap variants. 

Biastools can generate bias-by-length diagram for both simulated and real read alignment. Across all aligners, the lines tend to diverge more for extreme-length insertion and deletions. In the real read experiment, BWA-MEM -L 30 maintains the closest to balance 0.5, followed by Bowtie 2, VG Giraffe, and the default BWA-MEM, consistent with the simulation results. 

Even without simulation data, biastools can predict whether an allele site is affected by reference bias by analyzing allelic balance and mapping quality. The ROC and PR curves for SNV prediction demonstrate that biastools offer reliable predictions of reference bias. 

In genomes where the HET sites are unknown, biastools can analyze the alignment and identify biased regions based on (a) read depth, (b) density of alternate (ALT) alleles, and (c) the frequency of non-diploid sites. Biastools can also be employed for comparing two different alignments to a common reference. In the IGV screenshot, biastools identifies bias across the entire region in the case of direct read alignment to GRCh38 (upper), but it only detects bias in small portions of the region for LevioSAM 2 alignment (lower).

Biastools can be easily installed with pip or [GitHub](https://github.com/maojanlin/biastools).
