---
layout: research
title: "Research"
permalink: /research/
author_profile: false
---

<div class="research-grid">
<aside class="research-chapters" aria-label="Research chapters">
<details open>
<summary>On this page <span id="research-current" aria-hidden="true"></span></summary>
<nav aria-label="Chapter navigation">
<a href="#research-map">Research map</a>
<a href="#reference-bias">0 · Reference bias</a>
<a href="#biastools">1 · biastools</a>
<a href="#personalized-references">2 · Personalized references</a>
<a href="#impute-first">impute-first</a>
<a href="#imput2t">ImpuT2T</a>
<a href="#immune-loci">3 · Complex immune loci</a>
<a href="#igloo">IGLoo</a>
<a href="#gairr-suite">gAIRR-suite</a>
</nav>
</details>
</aside>
<div class="research-content" markdown="1">

## A connected view of my research {#research-map}

My work connects the measurement of reference bias with the development of personalized references and the reconstruction and profiling of complex immune loci. Together, these approaches aim to build better references for genomic analysis.

<p class="research-map-instruction"><svg class="research-click-hand" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M12 18V8a2 2 0 0 1 4 0v8-3a2 2 0 0 1 4 0v3-1a2 2 0 0 1 4 0v3-1a2 2 0 0 1 4 0v6c0 4-3 7-7 7h-3c-2 0-4-1-5-3l-7-9a2 2 0 0 1 3-3l3 3z" fill="white" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 1v2M5 5l2 2M23 5l-2 2M3 11h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span>Select a <span class="research-teal-label">project block</span> to explore the work below. Select a numbered circle to enlarge its diagram.</span></p>

<div class="research-map-scroll" tabindex="0" role="region" aria-label="Interactive research diagram; scroll horizontally on small screens">
<div class="research-map">
<img src="{{ '/images/research-map.png' | relative_url }}" width="2400" height="1800" alt="Research overview: biastools measures reference bias; impute-first and ImpuT2T build personalized references; IGLoo and gAIRR-suite address complex immune loci. These approaches connect through better genomic references.">
<a class="research-map-link" href="#biastools" aria-label="Read about biastools" style="left:11.4444%;top:64.7407%;width:9.6111%;height:3.4074%"><span class="research-sr-only">biastools</span></a>
<a class="research-map-link" href="#impute-first" aria-label="Read about impute-first" style="left:48.3889%;top:23.6296%;width:9.5556%;height:3.4815%"><span class="research-sr-only">impute-first</span></a>
<a class="research-map-link" href="#imput2t" aria-label="Read about ImpuT2T" style="left:74.1111%;top:23.6296%;width:9.6111%;height:3.4815%"><span class="research-sr-only">ImpuT2T</span></a>
<a class="research-map-link" href="#igloo" aria-label="Read about IGLoo" style="left:42.6111%;top:86.3704%;width:9.6111%;height:3.4815%"><span class="research-sr-only">IGLoo</span></a>
<a class="research-map-link" href="#gairr-suite" aria-label="Read about gAIRR-suite" style="left:69.1111%;top:81.2593%;width:9.6111%;height:3.4815%"><span class="research-sr-only">gAIRR-suite</span></a>
</div>
</div>
<!--
<p class="research-map-caption"><a href="{{ '/files/research-diagram.pdf' | relative_url }}">View the original diagram %(PDF)</a> · Teal blocks link to project details.</p>
-->

## 0 · Background: reference bias {#reference-bias}

Reference bias occurs when reads carrying alternative (ALT) alleles fail to align correctly. The resulting alignment favors the reference genome's genotype, which can affect downstream analysis. My work addresses both how to measure reference bias and how better reference genomes can reduce the bias.

## 1 · Measuring reference bias {#biastools}

### biastools

Many alignment methods aim to reduce reference bias, but evaluating how much bias remains can be challenging. Reference bias can manifest in different ways, for example, a variant site may repel reads carrying the ALT allele, or it may attract reads from elsewhere in the genome, leading to misleading results. We developed **biastools**, a framework to measure, categorize, and visualize reference bias. Its analysis connects individual alleles and biased genomic regions to the overall behavior of an alignment workflow.

- [Paper · Genome Biology (2024)](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-024-03240-8)
- [Software · GitHub](https://github.com/maojanlin/biastools)

<figure style="width: 70%;">
<img src="{{ '/images/biastools.png' | relative_url }}" alt="Bias-by-allele-length comparison for HG002 using linear alignment, VG with a 1KGP graph, and impute-first with LevioSAM2." loading="lazy">
<figcaption>
Bias-by-allele-length analysis for HG002 comparing three alignment strategies: standard linear reference genome, VG alignment with a 1KGP pangenome graph, and the impute-first approach using a personalized genome and LevioSAM2 workflow. Curves nearer to the 0.5 dashed line indicate less reference bias. The results show a trend: the personalized genome reduces reference bias most effectively, followed by the pangenome approach, with the standard linear reference showing the most bias.
</figcaption>
</figure>

## 2 · Building and using personalized references {#personalized-references}

Personalized references bring the reference sequence closer to the donor genome. The diagram connects two routes: imputation before alignment, and patching a draft assembly with a pangenome reference.

### impute-first {#impute-first}

The **impute-first** project first imputes the donor's genomic variants using a subsampled read alignment. This approach enables the creation of a personalized reference genome prior to the main sequence alignment step, which reduces reference bias and improves the accuracy of downstream variant calling.

I developed the downstream workflow using [LevioSAM2](https://github.com/milkschen/leviosam2) to lift alignments from the personalized genome back to a standard reference such as GRCh38 or T2T-CHM13. This approach enables the advantages of personalized references while maintaining compatibility with standard genomic coordinates, offering a linear-space alternative to graph-based alignment methods.

- [Paper · Genome Research (2026)](https://doi.org/10.1101/gr.280989.125)
- [Software · GitHub](https://github.com/kvaddad1/impute-first)

### ImpuT2T {#imput2t}

**ImpuT2T** utilizes a pangenome (HPRC2) to scaffold and patch draft genome assemblies, selecting the reference haplotype with the highest sequence identity to fill each gap. We compared standard reference-based scaffolding with RagTag, single-reference patching using GPatch, **ImpuT2T** with a single reference, and **ImpuT2T** using the full pangenome reference set. Among all methods, **ImpuT2T** with the pangenome recovered the largest portion of the benchmark genome while introducing the fewest errors.

- [Preprint · bioRxiv (2026)](https://doi.org/10.64898/2026.07.27.741037)
- [Software · GitHub](https://github.com/maojanlin/ImpuT2T)

<figure style="width: 60%;">
<a href="{{ '/files/imput2t-results.pdf' | relative_url }}" aria-label="Open the full-resolution ImpuT2T results PDF">
<img src="{{ '/images/imput2t-results.png' | relative_url }}" width="2600" height="1696" alt="Coverage versus total substitution and indel errors for five samples, comparing ragtag scaffolding, GPatch, ImpuT2T-1, and ImpuT2T-470." loading="lazy">
</a>
<figcaption>ImpuT2T results: benchmark genome coverage versus total substitution and indel errors across five samples. <a href="{{ '/files/imput2t-results.pdf' | relative_url }}">View the full-resolution figure (PDF)</a>.</figcaption>
</figure>

## 3 · Resolving complex immune loci {#immune-loci}

Immunoglobulin (IG) and T cell receptor (TR) loci are genetically complex regions central to adaptive immunity. My work combines reconstruction of IG loci with germline gene profiling through targeted sequencing and genome assemblies.

### IGLoo {#igloo}

High-quality human genome assemblies derived from lymphoblastoid cell lines (LCLs) contribute to reference genomes and pangenomes. Their IG loci, however, can contain a mixture of germline and somatically recombined haplotypes, complicating genotyping and assembly.

We developed **IGLoo** to analyze V(D)J recombination events in LCL sequencing data and use that information to reassemble the immunoglobulin heavy chain (IGH) locus. Compared with the original HPRC-v1 assemblies, the reassembled loci contain more IG genes and have a lower overall switching error rate.

- [Paper · Cell Reports Methods (2025)](https://doi.org/10.1016/j.crmeth.2025.101033)
- [Software · GitHub](https://github.com/maojanlin/IGLoo)

<figure style="width: 80%;">
<a href="{{ '/files/igloo-graphical-abstract.pdf' | relative_url }}" aria-label="Open the IGLoo graphical abstract PDF for full-resolution viewing">
<img src="{{ '/images/igloo-graphical-abstract.png' | relative_url }}" width="2600" height="2600" alt="IGLoo workflow for profiling and reconstructing the IGH locus from lymphoblastoid cell line sequencing data." loading="lazy">
</a>
<figcaption>IGLoo profiles the IGH locus from LCL sequencing data. <a href="{{ '/files/igloo-graphical-abstract.pdf' | relative_url }}">View the full-resolution graphical abstract (PDF, 114 KiB)</a>.</figcaption>
</figure>

### gAIRR-suite {#gairr-suite}

The adaptive immune receptor repertoire (AIRR) is encoded by TR and IG genes. Profiling the germline genes that encode this repertoire (gAIRR) is important for understanding adaptive immune responses, but their genetic complexity presents substantial challenges.

We developed **gAIRR-suite** to profile human TR and IG genes using publicly available personal phased assemblies and capture-based targeted sequencing of genomic DNA. As shown in the diagram, these complementary inputs support gene annotation and allele typing.

- [Paper · Frontiers in Immunology (2022)](https://www.frontiersin.org/journals/immunology/articles/10.3389/fimmu.2022.922513/full)
- [Software · GitHub](https://github.com/maojanlin/gAIRRsuite)

[Back to the research map](#research-map)

</div>
</div>
