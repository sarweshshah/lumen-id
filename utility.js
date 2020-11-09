class Utility {
  letterToNum(letters) {
    let arr = [];
    for (let l of letters) {
      arr.push(l.charCodeAt(0) - 64);
    }
    return arr;
  }

  polygon(_x, _y, _rad, _nPoints) {
    beginShape();
    for (let i = 0; i < _nPoints; i++) {
      vertex(
        _x + _rad * sin(TAU / _nPoints * i - HALF_PI),
        _y + _rad * cos(TAU / _nPoints * i - HALF_PI)
      )
    }
    endShape(CLOSE);
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  static editName(nm) {
    if (nm.length > 25) {
      let nmArray = nm.trim().replaceAll(".", "").toUpperCase().split(" ");
      nmArray.splice(2, 0, '\n');
      return nmArray;
    }
    return nm;
  }
}