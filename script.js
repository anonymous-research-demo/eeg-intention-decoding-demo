fetch('demo_trials.json')
    .then(response => response.json())
    .then(data => {

        const content = document.getElementById('content');

        for (const condition in data) {

            const section = document.createElement('div');
            section.className = "section";

            const title = document.createElement('div');
            title.className = "section-title";
            title.innerHTML = condition;
            section.appendChild(title);

            // Header
            const header = document.createElement('div');
            header.className = "table-header";
            header.innerHTML = `
                <div class="cell">GT</div>
                <div class="cell">Audio</div>
                <div class="cell">ASR (raw)</div>
                <div class="cell">ASR (mapping)</div>
                <div class="cell">Ours</div>
            `;
            section.appendChild(header);

            // Rows
            const samples = data[condition];

            for (const sample in samples) {

                const trial = samples[sample];

                const row = document.createElement('div');
                row.className = "table-row";

                const mappedClass = trial.asr_transcript === trial.ground_truth
                    ? "correct" : "incorrect";

                const oursClass = trial.eeg_prediction === trial.ground_truth
                    ? "correct" : "incorrect";

                row.innerHTML = `
                    <div class="cell gt">${trial.ground_truth}</div>
                    <div class="cell">
                        <audio controls>
                            <source src="${trial.audio}" type="audio/wav">
                        </audio>
                    </div>
                    <div class="cell">${trial.asr_transcript_raw}</div>
                    <div class="cell ${mappedClass}">${trial.asr_transcript}</div>
                    <div class="cell ${oursClass}">${trial.eeg_prediction}</div>
                `;

                section.appendChild(row);
            }

            content.appendChild(section);
        }

    });
