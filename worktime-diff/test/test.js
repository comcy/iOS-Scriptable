// test/test.mjs
import { expect } from 'chai';
import { calculateTimeDifference, adjustWorkTime } from '../src/zeitdiff.js';

describe('Zeitdifferenz Berechnung', function () {
    it('sollte die richtige Zeitdifferenz berechnen', function () {
        const startTime = "08:00";
        const endTime = "12:45";
        const result = calculateTimeDifference(startTime, endTime);
        expect(result).to.deep.equal({ hours: 4, minutes: 45 });
    });

    it('sollte die richtige Zeitdifferenz über Mitternacht berechnen', function () {
        const startTime = "23:00";
        const endTime = "01:00";
        const result = calculateTimeDifference(startTime, endTime);
        expect(result).to.deep.equal({ hours: 2, minutes: 0 });
    });
});

describe('Anpassung der Arbeitszeit', function () {
    it('sollte Arbeitszeit auf 2 Stunden und 30 Minuten beschränken, wenn sie überschritten wird', function () {
        const timeDifference = { hours: 2, minutes: 40 };
        const result = adjustWorkTime(timeDifference);
        expect(result).to.deep.equal({ hours: 2, minutes: 30 });
    });

    it('sollte Arbeitszeit auf 4 Stunden und 45 Minuten beschränken, wenn sie überschritten wird', function () {
        const timeDifference = { hours: 5, minutes: 30 };
        const result = adjustWorkTime(timeDifference);
        expect(result).to.deep.equal({ hours: 4, minutes: 45 });
    });

    it('sollte Arbeitszeit korrekt anpassen, wenn sie zwischen 2:30 und 4:45 Stunden liegt', function () {
        const timeDifference = { hours: 3, minutes: 0 };
        const result = adjustWorkTime(timeDifference);
        expect(result).to.deep.equal({ hours: 3, minutes: 0 });
    });

    it('sollte Arbeitszeit korrekt anpassen, wenn sie 2:45 Stunden überschreitet', function () {
        const timeDifference = { hours: 2, minutes: 50 };
        const result = adjustWorkTime(timeDifference);
        expect(result).to.deep.equal({ hours: 2, minutes: 35 });
    });

    it('sollte Arbeitszeit korrekt anpassen, wenn sie 4:45 Stunden überschreitet', function () {
        const timeDifference = { hours: 5, minutes: 50 };
        const result = adjustWorkTime(timeDifference);
        expect(result).to.deep.equal({ hours: 5, minutes: 5 });
    });
});
