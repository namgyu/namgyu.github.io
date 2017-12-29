if (!(String.prototype.formatNumberComma)) {
    String.prototype.formatNumberComma = function() {
        this._separateNumber = [];
        this._hop = 3;
        this._commaCount = parseInt(this.length / this._hop);

        if (!(this.length % this._hop)) {
            this._commaCount = this._commaCount - 1;
        }

        for (var i = 1; i <= this._commaCount + 1; i++) {
            var startIdx = this.length - (this._hop * i);

            if (this.length <= (this._hop * i)) {
                this._hop = this.length - (this._separateNumber.length * 3);
                this._separateNumber.push(this.substr(0, this._hop));
            } else {
                this._separateNumber.push(this.substr(startIdx, this._hop));
            }
        }

        return this._separateNumber.reverse().join(",");
    };
}

$('.animateNum').each(function (idx) {
    $(this).data("prev", $(this).text());
    $(this).animate({
        num : $(this).data("prev").length === 1 ? 9 : $(this).data("prev")
    }, {
        duration: 300 * ((idx + 1) / 2),
        easing: 'swing',
        step: function (now) {
            $(this).attr("class", "animateNum " + Math.ceil(now));
           	$(this).text(Math.ceil(now).toString().formatNumberComma());
        },
        complete: function() {
            $(this).attr("class", "animateNum " + $(this).data("prev"));
            $(this).text($(this).data("prev").formatNumberComma());
        }
    });
});