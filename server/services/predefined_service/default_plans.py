"""
Default 30-Day Curated Entrance Study Plans
Covers +2 Science, IOE (Engineering), IOM (Medical), and Entrance Exam curricula.
"""

def generate_subject_plan(subject: str) -> dict:
    subject_normalized = subject.strip().capitalize()
    
    plans = {
        "Physics": [
            ("Units, Dimensions & Errors", "Physical quantities, dimensional analysis, and error propagation."),
            ("Vectors & Scalar Products", "Dot product, cross product, vector components, and relative velocity."),
            ("Kinematics in 1D & 2D", "Equations of motion, projectile motion at an angle, and horizontal projectiles."),
            ("Newton's Laws & Friction", "Inertia, momentum conservation, static/kinetic friction, and inclined planes."),
            ("Work, Energy & Power", "Work-energy theorem, conservative forces, power calculation, and spring systems."),
            ("Circular Motion & Banking", "Centripetal acceleration, banking of roads, conical pendulum, and vertical loops."),
            ("Gravitation & Planetary Motion", "Kepler's laws, gravitational potential, orbital velocity, and escape velocity."),
            ("Rotational Dynamics & Torque", "Moment of inertia theorems, torque, angular momentum conservation, and rolling motion."),
            ("Elasticity & Hooke's Law", "Stress, strain, Young's/Bulk modulus, Poisson's ratio, and elastic energy."),
            ("Hydrostatics & Surface Tension", "Pascal's law, Archimedes principle, surface energy, and capillary rise."),
            ("Fluid Dynamics & Viscosity", "Equation of continuity, Bernoulli's theorem, Stokes' law, and Poiseuille's formula."),
            ("Simple Harmonic Motion (SHM)", "Displacement, velocity, acceleration in SHM, simple pendulum, and spring oscillations."),
            ("Thermal Expansion & Thermometry", "Linear/superficial/cubical expansion, bimetallic strip, and ideal gas temperature scales."),
            ("Calorimetry & Heat Transfer", "Specific heat capacity, latent heat, conduction, convection, and Stefan-Boltzmann radiation."),
            ("Kinetic Theory of Gases", "Assumptions of KTG, Maxwellian distribution, degrees of freedom, and internal energy."),
            ("Thermodynamics - 1st & 2nd Laws", "Isothermal/adiabatic processes, indicator diagrams, Carnot engine, and entropy."),
            ("Wave Motion & Acoustics", "Progressive waves, velocity of sound in gases, Laplace correction, and superpositions."),
            ("Doppler Effect & Resonance", "Doppler frequency shifts, organ pipes, resonance tube experiments, and beats."),
            ("Geometrical Optics - Reflection & Refraction", "Snell's law, critical angle, total internal reflection, and prism dispersion."),
            ("Lenses & Optical Instruments", "Lens maker's equation, combinations, simple/compound microscopes, and telescopes."),
            ("Wave Optics & Interference", "Huygens' principle, Young's double slit experiment, and fringe width calculation."),
            ("Diffraction & Polarization", "Single slit diffraction, resolving power, Brewster's law, and Nicol prisms."),
            ("Electrostatics & Coulomb's Law", "Electric field intensity, electric dipole, torque in uniform field, and flux."),
            ("Gauss's Law & Applications", "Flux through closed surfaces, field of charged wire/sheet, and spherical shells."),
            ("Electric Potential & Capacitance", "Potential due to point charge, parallel plate capacitor, dielectrics, and energy stored."),
            ("Current Electricity & Ohm's Law", "Drift velocity, resistivity, temperature coefficient, and color code of resistors."),
            ("Kirchhoff's Laws & Meter Bridge", "Network analysis, Wheatstone bridge principle, potentiometer, and internal resistance."),
            ("Magnetic Effect of Current", "Biot-Savart law, Ampere's circuital law, solenoid, toroid, and Lorentz force."),
            ("Electromagnetic Induction (EMI)", "Faraday's laws, Lenz's law, self/mutual inductance, and eddy currents."),
            ("Modern Physics & Atomic Structure", "Photoelectric effect, Einstein's equation, Bohr model, X-rays, and radioactivity."),
        ],
        "Chemistry": [
            ("Stoichiometry & Mole Concept", "Molar mass, empirical/molecular formula, limiting reagents, and concentration units."),
            ("Atomic Structure & Quantum Numbers", "Bohr model limitations, de Broglie relation, Heisenberg principle, and electronic configurations."),
            ("Periodic Table & Periodic Properties", "Ionization enthalpy, electron gain enthalpy, electronegativity trends, and shielding effect."),
            ("Chemical Bonding & Molecular Structure", "VSEPR theory, hybridization (sp, sp2, sp3), dipole moments, and hydrogen bonding."),
            ("Gaseous State & Gas Laws", "Boyle's, Charles's, and Ideal gas equation, Dalton's law, and van der Waals real gas equation."),
            ("Liquid & Solid State", "Vapor pressure, viscosity, unit cells (FCC, BCC, Simple), and Bragg's law."),
            ("Chemical Equilibrium", "Law of mass action, Kp vs Kc relations, Le Chatelier's principle, and reaction quotients."),
            ("Ionic Equilibrium & pH", "Arrhenius/Bronsted acids, Ostwald dilution law, common ion effect, buffer solutions, and Ksp."),
            ("Redox Reactions & Balancing", "Oxidation numbers, balancing redox equations via ion-electron method, and oxidizing agents."),
            ("Electrochemistry & Galvanic Cells", "Nernst equation, standard electrode potential, Faraday's electrolysis laws, and batteries."),
            ("Chemical Kinetics & Rate Laws", "Order and molecularity, integrated rate equations (zero and 1st order), and Arrhenius activation energy."),
            ("Surface Chemistry & Catalysis", "Adsorption isotherms (Freundlich), colloidal states, Tyndall effect, and enzyme catalysis."),
            ("Hydrogen, s-Block & Alkali Metals", "Hydrides, anomalous properties of lithium/beryllium, diagonal relationships, and caustic soda."),
            ("Alkaline Earth Metals", "Trends in basicity and solubility of hydroxides, biological importance of Mg & Ca."),
            ("p-Block Elements: Group 13 & 14", "Boron anomalies, diborane structure, carbon allotropes, and silicones."),
            ("p-Block Elements: Group 15 (Nitrogen Family)", "Ammonia synthesis (Haber process), nitric acid (Ostwald process), and phosphorus oxides."),
            ("p-Block Elements: Group 16 & 17", "Sulfuric acid (Contact process), ozone layer reactions, and halogen oxidizing power."),
            ("Noble Gases & Coordination Chemistry", "Xenon compounds, Werner's coordination theory, IUPAC nomenclature of complexes, and ligands."),
            ("d-Block & f-Block Transition Elements", "Variable oxidation states, catalytic properties, magnetic moments, and lanthanoid contraction."),
            ("Purification & Organic Nomenclature", "IUPAC rules for multifunctional organic compounds, inductive and resonance effects."),
            ("Isomerism in Organic Compounds", "Structural, geometrical (cis/trans), and optical isomerism (chirality & enantiomers)."),
            ("Alkanes & Free Radical Halogenation", "Preparation, Wurtz reaction, cracking, and free-radical substitution mechanism."),
            ("Alkenes & Markovnikov Addition", "E1/E2 elimination, peroxide effect (anti-Markovnikov), ozonolysis, and polymerization."),
            ("Alkynes & Acidity of Acetylene", "Addition reactions, hydration to ketones, and chemical tests to distinguish terminal alkynes."),
            ("Aromatic Hydrocarbons & Benzene", "Huckel's (4n+2) rule, electrophilic aromatic substitution (nitration, halogenation, Friedel-Crafts)."),
            ("Haloalkanes & Haloarenes", "SN1 vs SN2 reaction mechanisms, stereochemistry, and Grignard reagent synthesis."),
            ("Alcohols, Phenols & Ethers", "Hydroboration-oxidation, Lucas test, Kolbe reaction, Reimer-Tiemann reaction, and Williamson synthesis."),
            ("Aldehydes & Ketones", "Nucleophilic addition, Aldol condensation, Cannizzaro reaction, and Tollens/Fehling tests."),
            ("Carboxylic Acids & Amines", "Acidity comparison, esterification, Gabriel phthalimide synthesis, and Hinsberg amine test."),
            ("Biomolecules & Everyday Chemistry", "Carbohydrates (glucose/fructose), amino acids, peptide bonds, DNA/RNA structures, and polymers."),
        ],
        "Mathematics": [
            ("Sets, Relations & Functions", "Set operations, Cartesian product, equivalence relations, injective/surjective mappings."),
            ("Quadratic Equations & Roots", "Nature of roots, relation between roots and coefficients, symmetric functions, and extrema."),
            ("Complex Numbers & Argand Plane", "Algebra of complex numbers, modulus-argument form, De Moivre's theorem, and roots of unity."),
            ("Sequences, Series & Progressions", "Arithmetic, geometric, and harmonic progressions, sum to infinity, and AM-GM inequality."),
            ("Permutations & Combinations", "Fundamental counting principles, circular permutations, combinations with repetition, and distribution."),
            ("Binomial Theorem & Expansions", "General term, middle term, properties of binomial coefficients, and approximations."),
            ("Matrices & Determinants", "Matrix multiplication, transpose, adjoint, inverse, Cramer's rule, and rank."),
            ("Trigonometric Ratios & Identities", "Compound angles, multiple and sub-multiple angles, conditional identities."),
            ("Trigonometric Equations", "Principal and general solutions of sin θ = k, cos θ = k, and tan θ = k."),
            ("Properties of Triangles & Heights", "Sine rule, cosine rule, projection formulae, in-radius, ex-radii, and elevation problems."),
            ("Inverse Trigonometric Functions", "Principal value branches, sum and difference formulas of inverse trigonometric functions."),
            ("Straight Lines & Slopes", "Various forms of linear equations, angle between two lines, distance from a point, and concurrent lines."),
            ("Pair of Straight Lines", "Homogeneous quadratic equation in two variables, condition for perpendicularity and parallelism."),
            ("Circles & Tangents", "Standard and general equations of a circle, chord of contact, tangent equations, and director circles."),
            ("Parabola & Standard Forms", "Focus, directrix, vertex, focal chord, latus rectum, and equations of tangents to parabola."),
            ("Ellipse & Eccentricity", "Major/minor axes, eccentricity formula, auxiliary circle, and standard tangent conditions."),
            ("Hyperbola & Asymptotes", "Focal properties, conjugate hyperbola, rectangular hyperbola, and asymptotes."),
            ("Vectors in 2D & 3D Space", "Position vectors, scalar (dot) product, vector (cross) product, and scalar triple product."),
            ("Three Dimensional Geometry", "Direction cosines, direction ratios, angle between lines, skew lines, and shortest distance."),
            ("Limits & L'Hopital's Rule", "Standard trigonometric limits, exponential/logarithmic limits, and evaluation of indeterminate forms."),
            ("Continuity & Differentiability", "Checking continuity at a point, differentiability conditions, and Cauchy mean value theorem."),
            ("Differentiation Techniques", "Chain rule, implicit differentiation, logarithmic differentiation, and parametric derivatives."),
            ("Tangents, Normals & Rate Measure", "Equation of tangent/normal at a curve, rate of change, and orthogonal curves."),
            ("Monotonicity & Maxima-Minima", "Increasing/decreasing intervals, first and second derivative tests, and applied optimization problems."),
            ("Indefinite Integration: Substitutions", "Standard integration formulas, algebraic substitution, and trigonometric transforms."),
            ("Integration by Parts & Partial Fractions", "ILATE rule, reduction formulas, and rational functions partial fraction integration."),
            ("Definite Integrals & Properties", "Fundamental theorem of calculus, King's rule, periodic properties, and symmetry tricks."),
            ("Area Under Curves", "Area bounded by curves, line-parabola intersections, and symmetric multi-curve integration."),
            ("Differential Equations", "Order and degree, variable separable method, homogeneous equations, and linear differential equations."),
            ("Probability & Statistics", "Conditional probability, Bayes' theorem, binomial distribution, variance, and standard deviation."),
        ],
        "Biology": [
            ("Cell Structure & Organelles", "Prokaryotic vs eukaryotic cells, cell membrane fluid mosaic model, and endomembrane systems."),
            ("Biomolecules & Cellular Enzymes", "Enzyme kinetics, activation energy, competitive inhibition, and protein conformations."),
            ("Cell Cycle & Mitosis/Meiosis", "Phases of cell cycle, check-points, chromosomal crossing over, and non-disjunction."),
            ("Plant Diversity & Algae/Fungi", "Thallophyta, Bryophyta life cycles, Pteridophyta alternation of generations, and gymnosperms."),
            ("Morphology of Flowering Plants", "Modifications of root, stem, leaf; floral formula, inflorescence types, and fruit anatomy."),
            ("Plant Anatomy & Tissues", "Meristematic tissues, vascular bundles, secondary growth in dicot stems, and annual rings."),
            ("Water Transport & Transpiration", "Water potential, osmosis, transpiration pull theory, and stomatal opening mechanisms."),
            ("Mineral Nutrition in Plants", "Essential macro/micronutrients, deficiency symptoms, and biological nitrogen fixation."),
            ("Photosynthesis: Light Reactions", "Chloroplast pigments, cyclic/non-cyclic photophosphorylation, and Z-scheme."),
            ("Photosynthesis: Dark Reactions (C3 & C4)", "Calvin cycle, Hatch-Slack pathway, photorespiration (C2 cycle), and limiting factors."),
            ("Plant Respiration & ATP Yield", "Glycolysis, Krebs cycle, electron transport chain (ETS), and fermentation balance sheets."),
            ("Plant Growth Regulators", "Auxins, gibberellins, cytokinins, ethylene, abscisic acid, and photoperiodism."),
            ("Animal Diversity: Non-Chordates", "Porifera, Cnidaria, Platyhelminthes, Annelida, Arthropoda, and Echinodermata characteristics."),
            ("Animal Diversity: Chordates", "Protochordates, Pisces, Amphibia, Reptilia, Aves, and Mammalia distinctive traits."),
            ("Animal Tissues & Epithelium", "Squamous, cuboidal, columnar, connective tissue matrix, cartilage, and bone histology."),
            ("Human Digestive System", "Alimentary canal histology, gastrointestinal enzymes, bile functions, and nutrient absorption."),
            ("Human Respiration & Gas Exchange", "Pulmonary volumes (Tidal, Vital), oxygen-hemoglobin dissociation curve, and carbon dioxide transport."),
            ("Circulatory System & Cardiac Cycle", "Double circulation, cardiac conducting system (SA node), ECG waves, and blood clotting cascade."),
            ("Excretion & Osmoregulation", "Nephron structure, counter-current multiplier mechanism, and renin-angiotensin-aldosterone system."),
            ("Locomotion & Skeletal System", "Axial and appendicular skeleton, synovial joint types, and sliding filament muscle contraction."),
            ("Nervous System & Neural Impulse", "Generation and propagation of action potential, synapse neurotransmission, and brain regions."),
            ("Sensory Organs: Eye and Ear", "Retinal photoreceptors, accommodation, cochlear organ of Corti, and vestibular balance."),
            ("Endocrine System & Hormones", "Pituitary, thyroid, adrenal, pancreatic hormones, and hormone action feedback loops."),
            ("Human Reproduction & Gametogenesis", "Spermatogenesis, oogenesis, menstrual cycle hormonal regulation, and fertilization."),
            ("Embryonic Development", "Cleavage, blastocyst implantation, placenta functions, and organogenesis landmarks."),
            ("Genetics: Mendelian Inheritance", "Monohybrid/dihybrid crosses, test crosses, incomplete dominance, and codominance."),
            ("Molecular Genetics & DNA Replication", "DNA double helix model, semi-conservative replication, and DNA polymerases."),
            ("Transcription, Genetic Code & Translation", "Central dogma, mRNA processing, tRNA anticodon, and protein synthesis initiation/elongation."),
            ("Evolution & Origin of Life", "Miller-Urey experiment, Darwinian natural selection, homologous vs analogous organs, and Hardy-Weinberg law."),
            ("Ecology, Biodiversity & Conservation", "Ecosystem trophic levels, ecological pyramids, biogeochemical cycles, and endangered species protection."),
        ],
        "English": [
            ("Subject-Verb Agreement Rules", "Singular/plural subject rules, collective nouns, compound subjects, and proximity concord."),
            ("Tenses & Time Expressions", "Present, past, and future tense distinctions, present perfect vs simple past, and continuous forms."),
            ("Modal Auxiliaries & Usage", "Can, could, may, might, must, should, would; expressing obligation, possibility, and deduction."),
            ("Voice: Active to Passive Transformation", "Rules for converting active sentences to passive, passive with modals, and imperative passive."),
            ("Reported Speech (Direct to Indirect)", "Backshift in tenses, pronoun modifications, reporting commands, questions, and exclamations."),
            ("Conditional Sentences (0, 1, 2, 3 & Mixed)", "Zero, first, second, and third conditionals, 'unless' clauses, and inverted conditionals."),
            ("Relative Clauses & Pronouns", "Defining vs non-defining relative clauses, who, whom, whose, which, that, and omission of pronouns."),
            ("Prepositions of Time, Place & Direction", "At, on, in, into, onto, between, among; fixed prepositions following verbs and adjectives."),
            ("Conjunctions & Connectors", "Coordinating (FANBOYS), subordinating, and correlative conjunctions; expressing contrast and cause."),
            ("Articles & Determiners", "Definite (the) vs indefinite (a/an) articles, omission of articles, few/a few, little/a little."),
            ("Gerunds vs Infinitives", "Verbs followed by gerunds (-ing), verbs followed by to-infinitive, and bare infinitives."),
            ("Tag Questions & Inversions", "Formulating question tags, negative tags with positive verbs, negative inversions ('Seldom have I...')."),
            ("Vocabulary: High-Frequency Entrance Words", "Contextual root words (Greek/Latin roots), prefixes, suffixes, and tone deciphering."),
            ("Synonyms & Antonyms in Context", "Identifying nuanced word meanings and selecting authoritative equivalents for exams."),
            ("Idiomatic Expressions & Phrasal Verbs", "Common academic idioms, multi-word verbs, and prepositional phrasal pairs."),
            ("One-Word Substitutions", "Vocabulary for specific concepts, scientific disciplines, medical terms, and human dispositions."),
            ("Sentence Completion & Fillers", "Double fillers, logic-based contextual elimination, and structural clues."),
            ("Error Spotting & Sentence Correction", "Common grammatical traps: misplaced modifiers, dangling participles, and parallel structures."),
            ("Parallelism & Sentence Structure", "Maintaining grammatical balance in lists, comparisons, and correlative pairings."),
            ("Sentence Rearrangement (Para Jumbles)", "Identifying introductory sentences, transitional linkers, and logical conclusions."),
            ("Reading Comprehension: Main Idea & Theme", "Skimming and scanning strategies, author's perspective, and central thesis extraction."),
            ("Reading Comprehension: Inference Questions", "Reading between the lines, logical deductions, and eliminating deceptive options."),
            ("Tone, Attitude & Style Analysis", "Distinguishing objective, sarcastic, critical, enthusiastic, and analytical tones."),
            ("Analogies & Verbal Reasoning", "Word relationships: cause-effect, tool-worker, part-whole, and degree of intensity."),
            ("Cloze Test Strategies", "Passage-level structural coherence, grammatical flow, and vocabulary matching."),
            ("Spelling Rules & Confusing Words", "Commonly misspelled entrance terms, homophones (complement/compliment, principal/principle)."),
            ("Punctuation & Mechanics", "Semicolons, colons, em-dashes, apostrophes for possession, and comma splices."),
            ("Argument Analysis & Critical Reasoning", "Identifying assumptions, strengthening/weakening arguments, and identifying logical fallacies."),
            ("Formal Writing & Expression Principles", "Conciseness, avoiding redundant phrases ('return back', 'each and every'), and register."),
            ("Full Entrance Verbal Mock Practice", "Integrated examination review, speed-reading drill, and timed question accuracy."),
        ]
    }
    
    if subject_normalized not in plans:
        raise KeyError(f"Unsupported subject '{subject}'")
    raw_schedule = plans[subject_normalized]
    
    formatted_schedule = []
    for day_num, (title, description) in enumerate(raw_schedule, start=1):
        formatted_schedule.append({
            "day": day_num,
            "topics": [
                {
                    "title": f"{subject_normalized} - Unit {((day_num - 1) // 5) + 1}",
                    "subtopics": [
                        {
                            "title": title,
                            "description": f"### {title}\n\n**Overview & Learning Objectives**:\n{description}\n\n"
                                           f"**Key Concepts to Master**:\n"
                                           f"- In-depth theoretical grounding and formula derivations.\n"
                                           f"- Common entrance pitfalls and tricky conceptual nuances.\n"
                                           f"- Minimum 15 multiple-choice questions (MCQs) practice target.\n\n"
                                           f"**Self-Evaluation Metric**:\n"
                                           f"Ensure >= 80% accuracy on standard entrance tests for this unit."
                        }
                    ]
                }
            ]
        })
        
    return {
        "subject": subject_normalized,
        "totalDays": len(formatted_schedule),
        "schedule": formatted_schedule
    }
